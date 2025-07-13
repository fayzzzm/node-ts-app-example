// user.js
// Exports a User class for dynamic import demo

class User {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return `Hello, my name is ${this.name}`;
  }
}

module.exports = User; 