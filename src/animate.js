// const controls = require('./controls');
const init = require('./init/init');
const getRenderer = require('./init/getRenderer');
const letsMove = require('./letsMove');
const pointLockers = require('./pointLockers');

const start = (options) => {
  const {
    camera,
    scene,
    renderer,
    objects,
    raycaster
  } = options;

  // const keyboard = {};
  // const player = {
  //   height: 1.8,
  //   speed: 0.2,
  //   turnSpeed: Math.PI * 0.02
  // };
let prevTime = performance.now();

  const animate = () => {
    requestAnimationFrame(animate);

    const time = performance.now();
    letsMove(objects, raycaster, prevTime, time);

    const player = pointLockers();

    prevTime = time;

    // mesh.rotation.x += 0.1;
    // mesh.rotation.y += 0.1;
    //controls(keyboard, camera, player);
    renderer.render(scene, camera);

  };
  animate();

};


module.exports = {
  start
};
