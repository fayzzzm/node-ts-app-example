// 02-event-loop.js
// Demonstrates the Node.js event loop phases

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

console.log('End');

/*
Expected output order:
Start
End
process.nextTick
setTimeout
setImmediate

How to run:
  node examples/02-event-loop.js
*/ 