const Avatar = require('./avatar');
const otherPlayers = require('./otherPlayers');

module.exports = (id, {position, rotation}) => {
  const avatar = otherPlayers.get()[id].avatar;
  const player = avatar.mesh;
  const {x, y, z} = position;

  const playerHasStopped =
      Math.abs(player.position.x - x) < 0.1
      && Math.abs(player.position.y - y) < 0.1
      && Math.abs(player.position.z - z) < 0.1;

  const playerHasStartedMoving =
    Math.abs(player.position.x - x) > 0.1
    || Math.abs(player.position.y - y) > 0.1
    || Math.abs(player.position.z - z) > 0.1;

  if (avatar.walking && playerHasStopped) {
    Avatar.stopWalking(avatar);
  } else if (!avatar.walking && playerHasStartedMoving) {
    Avatar.startWalking(avatar);
  }

  player.position.set(x, y, z);

  if(rotation){
    player.rotation.y = rotation.y;
  }

  Avatar.render(avatar);
};
