// advanced-demo.js
// Demonstrates using a singleton logger and a User class from modules

const logger = require('./logger');
const User = require('./user');

const alice = new User('Alice');
const bob = new User('Bob');

logger.log(alice.greet());
logger.log(bob.greet());

/*
How to run:
  node advanced-demo.js
*/ 