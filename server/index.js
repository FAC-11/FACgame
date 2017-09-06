const express = require('express');
const socketio = require('socket.io');


const app = express();


app.get('', (req, res) => {
  res.redirect('/index.html');
});

app.use(express.static('public'));

const server = app.listen(3000, () => {
  console.log('Magic happens on port 3000!');
});


const io = socketio(server);

io.on('connection', function(socketio){
  console.log('socket is connected successfully', socketio.id);
  socket.emit
});
