// logger.js
// Exports a singleton logger instance

class Logger {
  log(message) {
    console.log(`[LOG] ${new Date().toISOString()}: ${message}`);
  }
}

module.exports = new Logger(); 