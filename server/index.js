const express = require('express');

const app = express();


app.get('', (req, res) => {
  res.redirect('/index.html');
});

app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Magic happens on port 3000!');
});
