const letsMove = require('./letsMove');
const pointLockers = require('./pointLockers');
const blocker = require('./blocker');
const otherPlayers = require('./otherPlayers');
const moveOtherPlayer = require('./moveOtherPlayer');
const getBullet = require('./getBullet');
const { movements } = require('./controls');
const socket = require('./socket');

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
    health,
    gun,
    objload,
  } = options;

  let prevTime = performance.now();

  const animate = () => {
    requestAnimationFrame(animate);
    if (!blocker.enabled) {
      const time = performance.now();
      letsMove(
        camera, scene, objects, raycaster, prevTime, time, pointerLockControls, world,
        timeStep,
        health,
        gun,
        objload,
      );

      const player = pointLockers();
      socket.emitPlayerPosition(player.position, player.rotation);

      if (movements.shooting) {
        const bullet = getBullet();
        socket.emitBulletPosition(bullet.randomid, bullet.velocity, bullet.position);
      }
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
  start,
};
