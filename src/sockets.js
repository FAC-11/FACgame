// handles socket communication with server for updating your player location
// and getting other player locations
const io = require('socket.io-client');
const Avatar = require('./Avatar');
const getScene = require('./getScene');
const otherPlayers = require('./otherPlayers');

const socket = io('http://localhost:1080');

socket.on('player data', (playerData) => {

  delete playerData[socket.id];
  otherPlayers.set(playerData);

  Object.keys(otherPlayers.get()).forEach((id) => {
    const avatar = Avatar.create();

    getScene().add(avatar.mesh);
    avatar.name = id;

    otherPlayers.get()[id].avatar = avatar;
    const {x, y, z} = playerData[id].position;
    avatar.mesh.position.set(x, y, z);
  });
});

socket.on('new player', ({id}) => {

  const avatar = Avatar.create();
  getScene().add(avatar.mesh);

  avatar.name = id;
  // high y value to hide bug where extra avatar appears in starting spot
  otherPlayers.addPlayer(id, {position:{x: 0, y: 100, z:0}, rotation:{}, avatar});
});

socket.on('other player position', ({id, position, rotation}) => {
  const player = otherPlayers.get()[id];
  player.position = position;
  player.rotation = rotation;
});

socket.on('other player disconnected', ({id}) => {
  console.log('other player disconnected')
  const players = otherPlayers.get();

  const avatar = players[id].avatar;
  getScene().remove(avatar.mesh);
  delete players[id];
});

const lastPosition = {x: null, y: null, z:null};
const lastRotation = {x: null, y: null, z:null};

const emitPlayerPosition = (position, rotation) => {
  rotation = {x: rotation.x, y:rotation.y, z:rotation.z}; // line looks strange but needed to deal with setters
  if (positionsDifferent(position, lastPosition) || positionsDifferent(rotation, lastRotation)) {
    socket.emit('position', {position, rotation});
    lastPosition.x = position.x;
    lastPosition.y = position.y;
    lastPosition.z = position.z;
    lastRotation.x = rotation.x;
    lastRotation.y = rotation.y;
    lastRotation.z = rotation.z;
  }
};
//
// const emitShotFired = ({position, rotation}) => {
//   rotation = {x: rotation.x, y:rotation.y, z:rotation.z}; // line looks strange but needed to deal with setters
//   socket.emit('shot fired', {position, rotation});
// };

const positionsDifferent = (p1, p2) =>
 !p1 || !p2 || p1.x !== p2.x || p1.y !== p2.y || p1.z !== p2.z;

module.exports = {
  emitPlayerPosition,
};
