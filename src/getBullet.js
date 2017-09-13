

const THREE = require('three');
const pointLockers = require('./pointLockers');
const getScene = require('./getScene');
const letsMove = require('./letsMove');

const { movements } = require('./controls');
const getRaycaster = require('./getRaycaster');

const velocity = new THREE.Vector3();

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-'+ s4() + '-'+ s4() + '-'+ s4()+s4()+s4();
  // return `${s4() + s4()}-${s4()}-${s4()}-${
  //   s4()}-${s4()}${s4()}${s4()}`;
}

const getBullet = (gun, guntime) => {
  const bullet = new THREE.Mesh(
    new THREE.SphereGeometry(1, 8, 8),
    new THREE.MeshBasicMaterial(),
  );
  const scene = getScene();
  bullet.position.set(
    pointLockers().position.x - Math.sin((pointLockers().rotation._y) - 0.5) * 6.2,
    (gun.position.y - 5) - 0.5 + Math.sin(guntime * 4 + (pointLockers().position.x + pointLockers().position.y) * 0.1) * 0.03,
    pointLockers().position.z - Math.cos((pointLockers().rotation._y) - 0.5) * 6.2,
  );

  const player = pointLockers();

  bullet.velocity = new THREE.Vector3(
    -Math.sin(pointLockers().rotation._y) * 20,
    0,
    -Math.cos(pointLockers().rotation._y) * 20,
  );

  bullet.alive = true;
  bullet.randomid = guid();

  var origin = new THREE.Vector3();
  origin.set(bullet.position.x, bullet.position.y, bullet.position.z);
  var vector = new THREE.Vector3();
  vector.set(-Math.sin(pointLockers().rotation._y) * 20,
    0, -Math.cos(pointLockers().rotation._y) * 20,
  );


//attempt at raycasting bullets 
  const bulletRay = new THREE.Raycaster(origin,vector,0,5);
  // bulletRay.set(origin, vector);

  var intersects = bulletRay.intersectObjects(scene.children);
  console.log('hit', intersects);
  console.log('bulletray', bulletRay);

  for (var i = 0; i < intersects.length; i++) {

    intersects[i].object.material.color.set(0xff0000);

  }

  setTimeout(() => {
    bullet.alive = false;
    scene.remove(bullet);
  }, 1000);

  return bullet;
};

module.exports = getBullet;
