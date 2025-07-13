# Node.js Event Loop Example

This example demonstrates the Node.js event loop phases using timers, immediates, and nextTick.

## File
- `02-event-loop.js`

## What it does
- Shows the order in which synchronous code, `process.nextTick`, `setTimeout`, and `setImmediate` are executed.

## How to Run
1. In this directory, run:
   ```
   node 02-event-loop.js
   ```

## Expected Output
```
Start
End
process.nextTick
setTimeout
setImmediate
```

## Why it matters
- Understanding the event loop is crucial for writing performant, non-blocking Node.js code.
- Helps you reason about when your callbacks will run. 