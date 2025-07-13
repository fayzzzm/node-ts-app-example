// 03-microtasks-macrotasks.js
// Demonstrates the order of microtasks and macrotasks in Node.js

console.log('Start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

setImmediate(() => {
  console.log('setImmediate');
});

process.nextTick(() => {
  console.log('process.nextTick');
});

Promise.resolve().then(() => {
  console.log('Promise.then');
});

console.log('End');

/*
Expected output order:
Start
End
process.nextTick
Promise.then
setTimeout
setImmediate

Explanation:
- Synchronous code runs first (Start, End)
- Microtasks: process.nextTick, then Promise.then
- Macrotasks: setTimeout (timers phase), then setImmediate (check phase)

How to run:
  node examples/03-microtasks-macrotasks.js
*/ 