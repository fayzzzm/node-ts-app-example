// user.js
// Exports a User class

class User {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return `Hello, my name is ${this.name}`;
  }
}

module.exports = User; 