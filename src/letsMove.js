const THREE = require('three');
const pointLockers = require('./pointLockers');
const socket = require('./socket');
const CANNON = require('cannon');
// const shoot = require('./shoot.js');
const otherBullets = require('./otherBullets');
const getBullet = require('./getBullet');

const rays = [];
let bullet = {};

const {
  movements,
} = require('./controls');

const bullets = [];
let clock = {};
const velocity = new THREE.Vector3();
let lastHealthPickup = 0;
let life = 30;
const score = 0;


function distance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

module.exports = function (
  camera,
  scene,
  objects,
  raycaster,
  prevTime,
  time,
  pointerLockControls,
  world,
  timeStep,
  health,
  gun,
) {
  const date = Date.now() - lastHealthPickup;

  world.step(timeStep);

  // make health bar rotate
  // health.rotation.x += 0.004;
  health.rotation.y += 0.008;

  clock = new THREE.Clock();
  const guntime = Date.now() * 0.0005;
  const gundelta = clock.getDelta();

  if (!document.getElementById('score').textContent) {
    document.getElementById('score').textContent = score;
  }

  if (!document.getElementById('health').textContent) {
    document.getElementById('health').textContent = life;
  }

  // console.log('datenow', Date.now());


  if (date > 10000) {
    health.material.wireframe = false;
  }

  if (distance(pointLockers().position.x, pointLockers().position.z, health.position.x, health.position.z) < 15 && life != 100 && date > 10000) {
    life = Math.min(life + 50, 100);
    document.getElementById('health').textContent = life;
    lastHealthPickup = Date.now();
    health.material.wireframe = true;
    // health.position.x = -300;
  }


  scene.children[1].position.copy(world.bodies[0].position);
  scene.children[1].quaternion.copy(world.bodies[0].quaternion);


  raycaster.ray.origin.copy(pointLockers().position);
  raycaster.ray.origin.y -= 10;
  const intersections = raycaster.intersectObjects(objects);
  const isOnObject = intersections.length > 0;
  const delta = (time - prevTime) / 1000;
  velocity.x -= velocity.x * 10.0 * delta;
  velocity.z -= velocity.z * 10.0 * delta;
  velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

  for (let index = 0; index < bullets.length; index++) {
    if (bullets[index] === undefined) {
      continue;
    }
    if (bullets[index].alive === false) {
      bullets.splice(index, 1);
      rays.splice(index, 1);
      continue;
    }
    bullets[index].position.add(bullets[index].velocity);
    // console.log(rays[index]);
    rays[index].ray.origin.set(
      bullets[index].position.x,
      bullets[index].position.y,
      bullets[index].position.z,
    );
    const intersects = rays[index].intersectObjects(scene.children, true);
    for (let i = 0; i < intersects.length; i++) {
      intersects[i].object.material.color.set(0xff0000);
      console.log(intersects[i]);
      bullets[index].alive = false;
      scene.remove(bullets[index]);
    }
  }

  if (movements.canShoot > 0) movements.canShoot -= 1;

  Object.keys(otherBullets.get()).forEach((id) => {
    const bullet = otherBullets.get()[id];
    if (bullet === undefined) {
      return;
    }
    if (bullet.alive === false) {
      delete otherBullets[id];
      return;
    }
    bullet.position.add(bullet.velocity);
  });


  if (movements.forward) {
    velocity.z -= 2000.0 * delta;
  }

  if (movements.backward) {
    velocity.z += 1000.0 * delta;
  }

  if (movements.left) {
    velocity.x -= 1000.0 * delta;
  }

  if (movements.right) {
    velocity.x += 1000.0 * delta;
  }

  if (isOnObject === true) {
    velocity.y = Math.max(0, velocity.y);
    movements.canJump = true;

    // prevents resting position y of players from changing after jump
    if (pointLockers().position.y < 20 && velocity.y <= 0) {
      pointLockers().position.y = 10;
    }
  }

  if (movements.jumping) {
    velocity.y = 350;
    movements.jumping = false;
    movements.canJump = false;
  }

  velocity.x = stopIfSlow(velocity.x);
  velocity.z = stopIfSlow(velocity.z);

  pointLockers().translateX(velocity.x * delta);
  pointLockers().translateY(velocity.y * delta);
  pointLockers().translateZ(velocity.z * delta);

  if (pointLockers().position.y < 10) {
    velocity.y = 0;
    pointLockers().position.y = 10;
    movements.canJump = true;
  }
  if (movements.shooting) {
    bullet = getBullet(gun, guntime);
    // console.log(bullet);
    const origin = new THREE.Vector3();
    origin.set(bullet.position.x, bullet.position.y, bullet.position.z);
    const vector = new THREE.Vector3();
    vector.set(
      -Math.sin(pointLockers().rotation._y),
      0, -Math.cos(pointLockers().rotation._y),
    );
    // Bullet raycasting, last parameter is the range
    const bulletRay = new THREE.Raycaster(origin, vector, 0, 30);
    // bulletRay.set(origin, vector);
    // const intersects = bulletRay.intersectObjects(scene.children, true);
    rays.push(bulletRay);
    // tells us how many bullets fire per click
    if (bullets.length < 2) {
      bullets.push(bullet);
      scene.add(bullet);
      movements.canShoot = 0;
    }
    // if (bullet.intersects.length > 0) {
    //   document.getElementById('score').textContent = bullet.intersects.length;
    // }
  }
  // console.log(rays);
  // Player Weapon
  gun.position.set(
    pointLockers().position.x - Math.sin((pointLockers().rotation._y) - 0.5) * 0.6,
    pointLockers().position.y - 0.5 + Math.sin(guntime * 4 + (pointLockers().position.x + pointLockers().position.y) * 0.1) * 0.03,
    pointLockers().position.z - Math.cos((pointLockers().rotation._y) - 0.5) * 0.6,
  );

  gun.rotation.set(
    (pointLockers().rotation._x),
    (pointLockers().rotation._y),
    (pointLockers().rotation._z),
  );
};

// this is to stop lots of tiny movements from being sent to server once
// player has stopped moving but continues to slightly slide
const stopIfSlow = velocity =>
  (Math.abs(velocity) < 0.1 ?
    0 :
    velocity);
