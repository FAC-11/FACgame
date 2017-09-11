const socketIo = require('socket.io');
const http = require('http');
const playerData = require('./playerData');
const bulletData = require('./bulletData');

module.exports = (app) => {
  const server = http.Server(app);
  const io = socketIo(server, {
    pingInterval: 10000,
    pingTimeout: 10000,
  });


  server.listen(1080);


  io.on('connection', (socket) => {
    console.log('socket is connected successfully', socket.id);

    // socket.emit -send the player data to the server
    socket.emit('player data', playerData.get());

    const id = socket.id;

    playerData.set(id, getPlayerDefaults());

    socket.broadcast.emit('new player', {
      id,
    });

    socket.on('position', ({
      position,
      rotation,
    }) => {
      if (!playerData.get(id)) {
        playerData.set(id, {
          position,
          rotation,
        });
      } else {
        playerData.update(id, {
          position,
          rotation,
        });
      }

      socket.broadcast.emit('other player position', {
        id,
        position,
        rotation,
      });
    });

    //     socket.emit('bullet is fired', bulletData.getId());
    // // socket.emit('bullet is fired', bulletData.getId());
    //     bulletData.set(id, getBulletDefaults());
    //     socket.broadcast.emit('bullet is fired', {id});

    // socket.emit('bullet is fired', bulletData.getId());
    //
    socket.on('bullet is fired', ({ randomid, velocity, position }) => {
      //
      socket.broadcast.emit('bullet is fired', { randomid, velocity, position });
      console.log('server-socket', randomid, velocity, position);
    });

    socket.on('bullet position', ({ randomid, velocity, position }) => {
      if (!bulletData.getId(randomid)) {
        bulletData.set(randomid, { velocity, position });
      }
      socket.broadcast.emit('other bullet position', {
        randomid, velocity, position,
      });
    });


    socket.on('disconnect', () => {
      playerData.remove(id);
      //  getScene().remove(avatar.mesh); // need to come back here and link the avatar.mesh with the right id
      socket.broadcast.emit('other player disconnected', {
        id,
      });
      console.log('player has left the room');
    });
  });
};

const getPlayerDefaults = () => ({
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
  rotation: {
    x: 0,
    y: 0,
    z: 0,
  },
  health: 100,
});

// const getBulletDefaults = () => ({
//   randomid: 'defd56d7-808e-79c0-7efd-dd2b2e2dc8d9',
//   velocity: {
//     x: 0.12250618072906018,
//     y: 0,
//     z: -0.9924677504499473 }
//   });
