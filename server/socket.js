const socketIo = require('socket.io');
const http = require('http');
const playerData = require('./playerData');
const bulletData = require('./bulletData');

module.exports = (app) => {

  const server = http.Server(app);
  const io = socketIo(server, {
    pingInterval: 10000,
    pingTimeout: 10000,
    path: '/game'
  });

  const port = process.env.PORT || 3000;

  server.listen(port, (err)=> {
    if(!err) { console.log("Listening on port" + port); }
});
  // const nsp = io.of('/game');

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



  socket.on('bullet is fired', ({randomid, velocity, position}) => {

    socket.broadcast.emit('bullet is fired', {randomid, velocity, position});

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
