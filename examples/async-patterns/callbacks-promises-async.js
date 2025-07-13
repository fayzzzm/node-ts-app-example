// 04-callbacks-promises-async.js
// Demonstrates callbacks, promises, and async/await in Node.js with a real-world example: read, transform, and write a file

const fs = require('fs'); // Callback API
const fsPromises = require('fs/promises'); // Promise/async API
const path = require('path');

const inputPath = path.join(__dirname, 'input.txt');
const outputPath = path.join(__dirname, 'output.txt');

// --- 1. Callback Style ---
function processFileCallback(cb) {
  fs.readFile(inputPath, 'utf8', (err, data) => {
    if (err) return cb(err);
    const result = data.toUpperCase();
    fs.writeFile(outputPath, result, (err) => {
      if (err) return cb(err);
      cb(null, 'Callback: Done!');
    });
  });
}

// --- 2. Promise Style ---
function processFilePromise() {
  return fsPromises.readFile(inputPath, 'utf8')
    .then((data) => data.toUpperCase())
    .then((result) => fsPromises.writeFile(outputPath, result))
    .then(() => 'Promise: Done!');
}

// --- 3. Async/Await Style ---
async function processFileAsync() {
  const data = await fsPromises.readFile(inputPath, 'utf8');
  const result = data.toUpperCase();
  await fsPromises.writeFile(outputPath, result);
  return 'Async/Await: Done!';
}

// --- Usage ---
console.log('Start');

processFileCallback((err, msg) => {
  if (err) return console.error('Callback Error:', err);
  console.log(msg);

  processFilePromise()
    .then((msg) => {
      console.log(msg);
      return processFileAsync();
    })
    .then((msg) => {
      console.log(msg);
      console.log('End');
    })
    .catch((err) => {
      console.error('Promise/Async Error:', err);
    });
});

/*
To try this example:
1. Create a file named input.txt in the examples/ directory with some text.
2. Run: node examples/04-callbacks-promises-async.js
3. Check output.txt for the transformed (UPPERCASE) text.

Expected output:
Start
Callback: Done!
Promise: Done!
Async/Await: Done!
End
*/ 