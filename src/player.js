const cubes = require('cubes');
const socketid = require('../server/index');
const letsMove = require('./letsMove');

// var Movement = cubes.getObj6().createScript('movement');
//
//
// Movement.attributes.add('playerSpeed', {
//     type: 'number',
//     default: 30,
//     title: 'Player Speed'
// });
// Movement.prototype.initialize = function() {
//     this.force = new pc.Vec3();
// };
// Movement.prototype.letsMove();
//
// const players = [];
//
// //Default player attribute values before game starts
// function Player (id) {
//     this.id = id;
//     this.x = 0;
//     this.y = 0;
//     this.z = 0;
//     this.entity = null;
//     this.health = 100;
//     this.velocity = 0;
// }
//
// // page loads, socket conenction and id created
// socketid.on('connection', function(socket) {
//   console.log('socket is connected successfully', socketio.id);
//     socket.on (‘initialize’, function () {
//         var idNum = players.length;
//         var newPlayer = new Player (idNum);
//         // Creates a new player object with a unique ID number.
//
//         players.push (newPlayer);
//         // Adds the newly created player to the array.
//
//         socket.emit (‘playerData’, {id: idNum, players: players});
//         // Sends the connecting client his unique ID, and data about the other players already connected.
//
//         socket.broadcast.emit (‘playerJoined’, newPlayer);
//         // Sends everyone except the connecting player data about the new player.
//     });
// });


// function that creates player with id= socket.id and initial attributes: position(x,y,z), health and velocity



//player moves, we need function that updates his attributes
