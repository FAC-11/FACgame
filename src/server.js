const http = require('http');
//const router = require('./router.js')

const server = http.createServer(index.html);
const port = process.env.PORT || 3000;

const startServer = () => {
  server.listen(port, () => {
    console.log(`Magic happens on port ${port}`);
  });
}

startServer();
