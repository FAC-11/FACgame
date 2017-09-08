const THREE = require('three');
const pointLockers = require('./pointLockers');
const CANNON = require('cannon');
// const shoot = require('./shoot.js');

const {
  movements,
} = require('./controls');

const bullets = [];
const velocity = new THREE.Vector3();

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
) {
  world.step(timeStep);

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
    if (bullets[index].alive == false) {
      bullets.splice(index, 1);
      continue;
    }
    // bullets[index].position.add(bullets[index].velocity);
  }

  if (movements.shooting) {
    // shoot.bullet(scene);
    const bullet = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 8, 8),
      new THREE.MeshBasicMaterial(),
    );

    const shape = new CANNON.Sphere(new CANNON.Vec3(0.5));
    const body = new CANNON.Body({
      mass: 1,
    });
    body.addShape(shape);
    body.position.set(
      raycaster.ray.origin.x,
      raycaster.ray.origin.y,
      raycaster.ray.origin.z,
    );
    world.addBody(body);


    bullet.position.copy(world.bodies[world.bodies.length-1].position);
    bullet.quaternion.copy(world.bodies[world.bodies.length-1].quaternion);


    bullet.velocity = new CANNON.Vec3(
      -Math.sin(pointerLockControls.getObject().rotation._y),
      0,
      -Math.cos(pointerLockControls.getObject().rotation._y),
    );

console.log('thing',world.bodies[world.bodies.length-1] );
    bullet.alive = true;
    setTimeout(() => {
      bullet.alive = false;
      scene.remove(bullet);
      world.remove(world.bodies[world.bodies.length-1]);
    }, 3000);
    bullets.push(bullet);
    scene.add(bullet);
  }

  if (movements.forward) { velocity.z -= 2000.0 * delta; }

  if (movements.backward) { velocity.z += 1000.0 * delta; }

  if (movements.left) { velocity.x -= 1000.0 * delta; }

  if (movements.right) { velocity.x += 1000.0 * delta; }

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
};

// this is to stop lots of tiny movements from being sent to server once
// player has stopped moving but continues to slightly slide
const stopIfSlow = velocity =>
  (Math.abs(velocity) < 0.1 ?
    0 :
    velocity);
