const controls = require('./controls');
const init = require('./init');
const getRenderer = require('./getRenderer');

const start = (options) => {
  const {
    camera,
    scene,
    renderer
  } = options;

  const keyboard = {};
  const player = {
    height: 1.8,
    speed: 0.2,
    turnSpeed: Math.PI * 0.02
  };

  const animate = () => {
    requestAnimationFrame(animate);

    // mesh.rotation.x += 0.1;
    // mesh.rotation.y += 0.1;
    controls(keyboard, camera, player);
    renderer.render(scene, camera);

  };
  animate();

};


module.exports = {
  start
};
