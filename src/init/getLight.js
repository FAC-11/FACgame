const THREE = require('three');

module.exports = function() => {
  const light = new THREE.SpotLight(0xffffff, 0.85, 0, Math.PI / 2, 1);
  light.position.set(0, 1500, 1000);
  light.target.position.set(0, 0, 0);
  light.castShadow = true;
  light.shadow.camera.near = 0.1;
  light.shadow.camera.far = 25;
  return light;
}
