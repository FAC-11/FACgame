const letsMove = require('./letsMove');
// const pointLockers = require('./pointLockers');
const blocker = require('./blocker');
const otherPlayers = require('./otherPlayers');
const moveOtherPlayer = require('./moveOtherPlayer');

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

  let prevTime = performance.now();

  const animate = () => {
    requestAnimationFrame(animate);
    if (!blocker.enabled) {
      const time = performance.now();
      letsMove(
        camera,
        scene,
        objects,
        raycaster,
        prevTime,
        time,
        pointerLockControls,
        world,
        timeStep,
      );
      prevTime = time;
    }

    // mesh.rotation.x += 0.1;
    // mesh.rotation.y += 0.1;
    // controls(keyboard, camera, player);
    renderer.render(scene, camera);
  };
  animate();
};


module.exports = {
  start,
};
