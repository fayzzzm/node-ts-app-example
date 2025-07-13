# Advanced Node.js Modules Example

This folder demonstrates advanced module patterns in Node.js.

## Files
- `logger.js`: Exports a singleton logger instance.
- `user.js`: Exports a `User` class.
- `advanced-demo.js`: Uses both the logger and the User class.
- `a.js` & `b.js`: Demonstrate circular dependencies.
- `circular-demo.js`: Shows what happens when modules require each other.
- `dynamic-import-demo.js`: Loads a module dynamically at runtime.

## How to Run
- For singleton/class: `node advanced-demo.js`
- For circular dependencies: `node circular-demo.js`
- For dynamic import: `node dynamic-import-demo.js`

## What You Learn
- How to export and use a singleton (shared instance) across files.
- How to export and use a class from a module.
- How Node.js handles circular dependencies (partially initialized exports).
- How to load modules dynamically at runtime.

## Next Steps
- Try adding ES Modules (ESM) examples for import/export syntax and top-level await! 