# Microtasks vs Macrotasks in Node.js

This example demonstrates the order of microtasks and macrotasks in Node.js.

## File
- `03-microtasks-macrotasks.js`

## What it does
- Shows the execution order of `process.nextTick`, `Promise.then`, `setTimeout`, and `setImmediate`.

## How to Run
1. In this directory, run:
   ```
   node 03-microtasks-macrotasks.js
   ```

## Expected Output
```
Start
End
process.nextTick
Promise.then
setTimeout
setImmediate
```

## Why it matters
- Microtasks (nextTick, Promises) run before macrotasks (timers, immediates).
- Understanding this order is key for advanced async programming in Node.js. 