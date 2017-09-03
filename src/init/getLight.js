const THREE = require('three');

const getLight = () => {
  const light = new THREE.PointLight(0xffffff, 0.2);
  light.position.set(-3, 6, -3);
  light.castShadow = true;
  light.shadow.camera.near = 0.1;
  light.shadow.camera.far = 25;
  // light.target.position.set(0, 0, 0);
  return light;
};

module.exports = getLight;
