// circular-demo.js
// Demonstrates circular dependencies between modules a.js and b.js

const a = require('./a');
const b = require('./b');

console.log('a.name:', a.name);
console.log('b.name:', b.name);
console.log('a.getBName():', a.getBName());
console.log('b.getAName():', b.getAName());

/*
How to run:
  node circular-demo.js

Expected output:
- You will see that during the loading process, one of the modules may get a partially initialized version of the other.
- This is how Node.js handles circular dependencies: it exports what it has so far.
*/ 