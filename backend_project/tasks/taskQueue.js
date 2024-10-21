// Task Queue System
const Queue = require('bull');

const taskQueue = new Queue('taskQueue');

// Add tasks to the queue
module.exports = taskQueue;