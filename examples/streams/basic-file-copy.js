// basic-file-copy.js
// Copies a file using readable and writable streams

const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, 'input.txt');
const dest = path.join(__dirname, 'output.txt');

const readStream = fs.createReadStream(source);
const writeStream = fs.createWriteStream(dest);

readStream.pipe(writeStream);

writeStream.on('finish', () => {
  console.log('File copied successfully!');
});

/*
How to run:
1. Create an input.txt file in this directory with some text.
2. Run:
   node basic-file-copy.js
3. Check output.txt for the copied content.
*/ 