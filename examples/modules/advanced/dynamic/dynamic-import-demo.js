// dynamic-import-demo.js
// Demonstrates dynamic (runtime) import of a module

const moduleName = './user'; // Could be any string, e.g., from user input
const User = require(moduleName);

const user = new User('Dynamic Dan');
console.log(user.greet());

/*
How to run:
  node dynamic-import-demo.js
*/ 