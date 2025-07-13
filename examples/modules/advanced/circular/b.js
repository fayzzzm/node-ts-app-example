// b.js
// Part of a circular dependency with a.js

const a = require('./a');

module.exports = {
  name: 'Module B',
  getAName: () => a.name,
};

if (require.main === module) {
  console.log('B loaded directly. a.name:', a.name);
} 