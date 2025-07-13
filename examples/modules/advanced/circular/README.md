# Circular Dependency Example

This example demonstrates how Node.js handles circular dependencies between modules.

## Files
- `a.js` and `b.js`: Require each other
- `circular-demo.js`: Loads both and shows the results

## How to Run
```
node circular-demo.js
```

## What You Learn
- How Node.js exports partially initialized modules in a circular dependency
- Why you should be careful with circular dependencies in your code 