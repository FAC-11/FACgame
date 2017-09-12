const express = require('express');
const socket = require('./socket');

const app = express();

socket(app);

app.get('', (req, res) => {
  res.redirect('/index.html');
});
app.get('/chooseleader', (req, res) => {
  res.redirect('/chooseleader.html');
})
app.get('/game', (req, res) => {
  res.redirect('/game.html');
})
app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Magic happens on port 3000!');
});
