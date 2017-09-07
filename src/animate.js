// const controls = require('./controls');
const init = require('./init/init');
const getRenderer = require('./init/getRenderer');
const letsMove = require('./letsMove');
const pointLockers = require('./pointLockers');
const blocker = require('./blocker');

const start = (options) => {
  const {
    camera,
    scene,
    renderer,
    objects,
    raycaster,
    pointerLockControls,
    world,
    timeStep,
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
    if (!blocker.enabled) {

      const time = performance.now();
      console.log(world);
      letsMove(camera,scene,objects, raycaster, prevTime, time, pointerLockControls, world, timeStep);
      //
      // const player = pointLockers();

      prevTime = time;
    }

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
