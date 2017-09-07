const socketIo = require('socket.io');
const http = require('http');
const playerData = require('./playerData');

module.exports = (app) => {

  const server = http.Server(app);
  const io = socketIo(server, {
    pingInterval: 5000,
    pingTimeout: 10000
  });


  server.listen(1080);


  io.on('connection', (socket) => {
    console.log('socket is connected successfully', socket.id);

    //socket.emit -send the player data to the server
    socket.emit('player data', playerData.get());

    const id = socket.id;

    playerData.set(id, getPlayerDefaults());

    socket.broadcast.emit('new player', {
      id
    });

    socket.on('position', ({
      position,
      rotation
    }) => {

      if (!playerData.get(id)) {
        playerData.set(id, {
          position,
          rotation
        });
      } else {
        playerData.update(id, {
          position,
          rotation
        })
      }

      socket.broadcast.emit('other player position', {
        id,
        position,
        rotation
      });
    });

    socket.on('disconnect', () => {
      playerData.remove(id);
      socket.broadcast.emit('other player disconnected', {
        id
      });
      console.log('player has left the room');
    });

  });

};

const getPlayerDefaults = () => ({
  position: {
    x: 0,
    y: 0,
    z: 0
  },
  rotation: {
    x: 0,
    y: 0,
    z: 0
  },
  health: 100
});
