const THREE = require('three');

module.exports = function() => {
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100, 20, 20),
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      wireframe: false
    })
  );
  floor.rotation.x -= Math.PI / 2;
  floor.receiveShadow = true;
  floor.castShadow = false;
  floor.position.y = -25;
  return floor
}
