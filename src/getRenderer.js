const THREE = require('three');

const getRenderer = () => {
  const renderer = new THREE.WebGLRenderer(0, 0, 0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;
  return renderer
}

module.exports = getRenderer;
