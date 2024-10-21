// Cloud Storage Configuration
const cloudStorage = require('cloud-storage');
const config = require('config');

module.exports = cloudStorage.connect(config.CLOUD_STORAGE_KEY);