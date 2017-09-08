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
    raycaster,
    pointerLockControls
  } = options;

  let prevTime = performance.now();

  const animate = () => {
    requestAnimationFrame(animate);
    if (!blocker.enabled) {

      const time = performance.now();
      letsMove(camera,scene,objects, raycaster, prevTime, time, pointerLockControls);
      //
      const player = pointLockers();
      //to send the players positions and the bullets
      socket.emitPlayerPosition(player.position, player.rotation);
  //    socket.emitBulletPosition(bullet.position, bullet.rotation);
      const players = otherPlayers.get();

      Object.keys(players).forEach((id) => {
        moveOtherPlayer(id, players[id]);
      });



      prevTime = time;
    }

    renderer.render(scene, camera);

  };
  animate();

};


module.exports = {
  start
};
