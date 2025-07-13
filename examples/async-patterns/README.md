# Asynchronous Patterns in Node.js

This section demonstrates the three core patterns for handling asynchronous operations in Node.js:

1. **Callbacks**
2. **Promises**
3. **Async/Await**

## Why Async Matters in Node.js
Node.js is designed for non-blocking, asynchronous operations. Most APIs (file system, network, database, timers) are asynchronous. Understanding these patterns is essential for writing efficient, maintainable Node.js code.

## Example: File Processing
The example file, `04-callbacks-promises-async.js`, shows how to read a file, transform its contents, and write the result using all three async patterns.

### How to Run
1. Create a file named `input.txt` in this directory with some text.
2. Run:
   ```
   node 04-callbacks-promises-async.js
   ```
3. Check `output.txt` for the transformed (UPPERCASE) text.

### Expected Output
```
Start
Callback: Done!
Promise: Done!
Async/Await: Done!
End
```

## When to Use Each Pattern
- **Callbacks:** Legacy code, some libraries.
- **Promises:** Modern APIs, chaining async operations.
- **Async/Await:** Most readable and maintainable for new code.

## Further Reading
- [Node.js Async Programming Guide](https://nodejs.dev/en/learn/asynchronous-programming-in-nodejs/)
- [MDN: Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [MDN: async/await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await) 