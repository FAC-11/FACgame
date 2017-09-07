const letsMove = require('./letsMove');
const socket = require('./socket');
const blocker = require('./blocker');


module.exports = () => {
  if(!blocker.enabled){
    socket.emitShotFired(letsMove());
  }
};
