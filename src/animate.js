const socket = require('./socket');
const init = require('./init/init');
const getRenderer = require('./init/getRenderer');
const letsMove = require('./letsMove');
const pointLockers = require('./pointLockers');
const blocker = require('./blocker');
const otherPlayers = require('./otherPlayers');
const moveOtherPlayer = require('./moveOtherPlayer');
const getBullet = require('./getBullet');
const {movements} = require('./controls');
// const testobject = require('./testobject');

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

      const player = pointLockers();
    //  socket.emitState(getLocalState());
      //to send the players positions and the bullets
    //  const bullet = testobject.getObj6();
    //  bullet.velocity = { x: -0.17509277691430628, y: 0, z: -0.9845519384331316 };
      socket.emitPlayerPosition(player.position, player.rotation);

      if (movements.shooting){
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
  start
};
