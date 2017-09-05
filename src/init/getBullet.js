const THREE = require('three');
const OBJLoader = require('three-obj-loader');
const MTLLoader = require('three-mtl-loader');
const scene = new THREE.Scene();

const getBullet = () => {
  const bullet = new THREE.Mesh(
    new THREE.SphereGeometry(5, 8, 8),
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: false
    })
  );

  bullet.alive = true;
  setTimeout(function() {
    bullet.alive = false;
    scene.remove(bullet);
  }, 1000);

  bullet.castShadow = true;

  scene.add(bullet);
};

module.exports = getBullet;
