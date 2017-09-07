// const controls = require('./controls');
const sockets = require('./sockets');
const init = require('./init/init');
const getRenderer = require('./init/getRenderer');
const letsMove = require('./letsMove');
const pointLockers = require('./pointLockers');
const blocker = require('./blocker');
const otherPlayers = require('./otherPlayers');
const moveOtherPlayer = require('./moveOtherPlayer');

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
    if (!blocker.enabled) {

      const time = performance.now();
      letsMove(objects, raycaster, prevTime, time);
      //
      const player = pointLockers();
      sockets.emitPlayerPosition(player.position, player.rotation);
      const players = otherPlayers.get();

      Object.keys(players).forEach((id) => {
        moveOtherPlayer(id, players[id]);
      });

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
