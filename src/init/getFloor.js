const THREE = require('three');

const getFloor = () => {
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100, 20, 20),
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      wireframe: false
    })
  );
  floor.rotation.x -= Math.PI / 2;
  floor.receiveShadow = true;
  return floor;
};

module.exports = getFloor;
