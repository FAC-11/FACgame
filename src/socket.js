// handles socket communication with server for updating your player location
// and getting other player locations
const io = require('socket.io-client');
const Avatar = require('./avatar');
const getScene = require('./getScene');
const otherPlayers = require('./otherPlayers');
const getBullet = require('./getBullet');
const { movements } = require('./controls');
const letsMove = require('./letsMove');
const otherBullets = require('./otherBullets');
// we connect the socket to the same port as the server-socket;

const socket = io('http://localhost:1080/game');



socket.on('player data', (playerData) => {
  // function on js that will delete the data of the player

  delete playerData[socket.id];

  otherPlayers.set(playerData);

  // create a new object with each new other player;
  // this will create an avatar with an id for each player;
  Object.keys(otherPlayers.get()).forEach((id) => {
    const avatar = Avatar.create();
    getScene().add(avatar.mesh);

    // avatar name will be the id of the other player;
    avatar.name = id;

    otherPlayers.get()[id].avatar = avatar;
    const { x, y, z } = playerData[id].position;
    avatar.mesh.position.set(x, y, z);
    console.log('otherplayers', otherPlayers);
  });
});

// set up a connection for each player, take the id and and add an avatar for that ew player

socket.on('new player', ({ id }) => {
  const avatar = Avatar.create();
  getScene().add(avatar.mesh);

  avatar.name = id;
  // high y value to hide bug where extra avatar appears in starting spot
  // add player with id, position and avatar
  otherPlayers.addPlayer(id, { position: { x: 0, y: 100, z: 0 }, rotation: {}, avatar });
});

// attach the id to position and rotation of player and send it to the other players
socket.on('other player position', ({ id, position, rotation }) => {
  const player = otherPlayers.get()[id];
  player.position = position;
  player.rotation = rotation;
});

// send the disconnection
socket.on('disconnect', ({ id }) => {
  console.log('other player disconnected');
  const players = otherPlayers.get();

  const avatar = players[id].avatar;
  delete players[id];

  let mesh = avatar.mesh;
  console.log('scene before', getScene().children.length, getScene().children);
  getScene().remove(mesh);

  mesh = undefined;
  console.log('scene after',  getScene().children.length, getScene().children);


});

const lastPosition = { x: null, y: null, z: null };
const lastRotation = { x: null, y: null, z: null };

const emitPlayerPosition = (position, rotation) => {
  rotation = { x: rotation.x, y: rotation.y, z: rotation.z }; // line looks strange but needed to deal with setters
  if (positionsDifferent(position, lastPosition) || positionsDifferent(rotation, lastRotation)) {
    socket.emit('position', { position, rotation });
    lastPosition.x = position.x;
    lastPosition.y = position.y;
    lastPosition.z = position.z;
    lastRotation.x = rotation.x;
    lastRotation.y = rotation.y;
    lastRotation.z = rotation.z;
  }
};

socket.on('bullet is fired', ({ randomid, velocity, position }) => {
  const bullet = getBullet();
  getScene().add(bullet);


  // if (!otherBullets[bullet.randomid]){

  otherBullets.addBullets(bullet.randomid, {
    randomid: bullet.randomid, velocity: bullet.velocity, position: bullet.position, mesh: bullet.mesh,
  });
  // const mesh = getBullet().mesh;
  // we added the setTimeout function to deal with an error appearing in the client browser
  // "THREE.Object3D.add: object not an instance of THREE.Object3D." but it does not seem tohelp

  console.log(otherBullets);
  console.log('bullet', bullet);
  console.log('bullet is fired', { randomid, velocity, position });
  // bullet.position = position;
  // bullet.rotation = rotation;
});

socket.on('other bullet position', ({ randomid, velocity, position }) => {
  console.log('bullet position', { randomid, velocity, position });
  const bullet = otherBullets.get()[randomid];
  bullet.velocity = velocity;
  bullet.position = position;
  bullet.position.add(velocity);

  console.log('bullet position', bullet);
});

// on this event we need ti add the bullets to the otherbullets module
// if it does not exist we aadd it, if it exists we updated it
// in our render function we need to render each other bullets same waywe render other bullets


const emitBulletPosition = (randomid, velocity, position) => {
  socket.emit('bullet is fired', { randomid, velocity, position });
};


const positionsDifferent = (p1, p2) =>
  !p1 || !p2 || p1.x !== p2.x || p1.y !== p2.y || p1.z !== p2.z;

module.exports = {
  emitPlayerPosition,
  emitBulletPosition,
};
