// 01-hello-world.js
// A minimal Node.js HTTP server

const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

// Listen on port 3000
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

/*
How to run:
  node examples/01-hello-world.js
Then visit http://localhost:3000/ in your browser.
*/ 