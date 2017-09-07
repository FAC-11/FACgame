const socketIo = require('socket.io');
const http = require('http');
const playerData = require('./playerData');

module.exports = (app) => {

  const server = http.Server(app);
  const io = socketIo(server, {
    pingInterval: 10000,
    pingTimeout: 10000
  });

  server.listen(1080);

  io.on('connection', (socket) => {

    socket.emit('player data', playerData.get());

    const {id} = socket;

    playerData.set(id, getPlayerDefaults());

    socket.broadcast.emit('new player', {id});

    socket.on('position', ({position, rotation}) => {

      if(!playerData.get(id)){
        playerData.set(id, {position, rotation})
      }else{
        playerData.update(id, {position, rotation});
      }

      socket.broadcast.emit('other player position', {id, position, rotation});
    });

    // socket.on('shot fired', ({position, rotation}) => {
    //   shots.push({
    //     position,
    //     rotation,
    //     createdAt: process.hrtime(),
    //     shooterId: id
    //   });
    //
    //   console.log('shots', shots.get())
    // });

    socket.on('disconnect', () => {
      playerData.remove(id);
      socket.broadcast.emit('other player disconnected', {id});
      console.log('disconnect');
      console.log('player data', playerData.get());
    });

  });

};

const getPlayerDefaults = () => ({
  position: { x: 0, y:0, z:0},
  rotation: { x: 0, y:0, z:0},
  health: 100
});
