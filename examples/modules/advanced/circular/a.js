// a.js
// Part of a circular dependency with b.js

const b = require('./b');

module.exports = {
  name: 'Module A',
  getBName: () => b.name,
};

if (require.main === module) {
  console.log('A loaded directly. b.name:', b.name);
} 