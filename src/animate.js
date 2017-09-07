const socket = require('./socket');
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

  let prevTime = performance.now();

  const animate = () => {
    requestAnimationFrame(animate);
    if (!blocker.enabled) {

      const time = performance.now();
      letsMove(objects, raycaster, prevTime, time);
      //
      const player = pointLockers();
      //to send the players positions and the bullets
      socket.emitPlayerPosition(player.position, player.rotation);
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
