// uppercase-transform.js
// Reads from input.txt, transforms to uppercase, writes to output-uppercase.txt

const fs = require('fs');
const { Transform } = require('stream');
const path = require('path');

const source = path.join(__dirname, 'input.txt');
const dest = path.join(__dirname, 'output-uppercase.txt');

const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

fs.createReadStream(source)
  .pipe(upperCaseTransform)
  .pipe(fs.createWriteStream(dest))
  .on('finish', () => {
    console.log('Uppercase transform complete!');
  });

/*
How to run:
1. Create input.txt in this directory.
2. Run: node uppercase-transform.js
3. Check output-uppercase.txt for the result.
*/ 