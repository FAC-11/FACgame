const express = require('express');
const socket = require('./socket');
const bodyParser = require('body-parser');
const app = express();
// const router = express.Router();

socket(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }));
// app.use(bodyParser.text());

app.get('', (req, res) => {
  res.redirect('/index.html');
});
app.get('/chooseleader', (req, res) => {
  res.redirect('/chooseleader.html');
})

app.post('/chooseleader', (req, res)=> {
  const image = req.body;
  console.log('req', req);
  res.end(image);
})
app.get('/game', (req, res) => {
  res.redirect('/game.html');
})
// app.get('/game', (req, res) => {
//
// })
app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Magic happens on port 3000!');
});
