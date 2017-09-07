const express = require('express');
const socket = require('./socket');

const app = express();

socket(app);

app.get('', (req, res) => {
  res.redirect('/index.html');
});

app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Magic happens on port 3000!');
});
