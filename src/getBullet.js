

const THREE = require('three');
const pointLockers = require('./pointLockers');
const getScene = require('./getScene');
// const shoot = require('./shoot.js');

const { movements } = require('./controls');
const getRaycaster = require('./getRaycaster');


const velocity = new THREE.Vector3();

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return `${s4() + s4()}-${s4()}-${s4()}-${
    s4()}-${s4()}${s4()}${s4()}`;
}

const getBullet = () => {
  const bullet = new THREE.Mesh(
    new THREE.SphereGeometry(1, 8, 8),
    new THREE.MeshBasicMaterial(),
  );

  const scene = getScene();

  const raycaster = getRaycaster();
  bullet.position.set(
    raycaster.ray.origin.x,
    raycaster.ray.origin.y,
    raycaster.ray.origin.z,
  );

  const player = pointLockers();

  bullet.velocity = new THREE.Vector3(
    -Math.sin(player.rotation._y - 0.2) * 20,
    0,
    -Math.cos(player.rotation._y - 0.2) * 20,
  );

  bullet.alive = true;
  bullet.randomid = guid();


  setTimeout(() => {
    bullet.alive = false;
    scene.remove(bullet);
  }, 1000);

  return bullet;
};

module.exports = getBullet;
