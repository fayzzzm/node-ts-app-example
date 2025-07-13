// echo-server.js
// A simple HTTP echo server using streams

const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  req.pipe(res); // Echoes whatever is sent in the request body
});

server.listen(3000, () => {
  console.log('Echo server running at http://localhost:3000/');
});

/*
How to use:
1. Run: node echo-server.js
2. In another terminal, try:
   curl -d 'hello world' http://localhost:3000/
   # You should see 'hello world' echoed back
*/ 