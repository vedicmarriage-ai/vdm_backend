// Module Model
const mongoose = require('mongoose');
const ModuleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String
});
module.exports = mongoose.model('Module', ModuleSchema);