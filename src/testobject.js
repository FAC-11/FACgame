const THREE = require('three');
const PointerLockControls = require('three-pointerlock');
const OBJLoader = require('three-obj-loader');

OBJLoader(THREE);
const MTLLoader = require('three-mtl-loader');

const getObj6 = () => {
  const obj6 = new THREE.Mesh(
    new THREE.BoxBufferGeometry(10, 10, 10),
    new THREE.MeshBasicMaterial({
      color: 0xffff00,
      wireframe: false,
    }),
  );

  obj6.position.set(10, -5, -30);
  obj6.velocity.set(1, 0, -1);
  return obj6;
};

module.exports = { obj6 };
