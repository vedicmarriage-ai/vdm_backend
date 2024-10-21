// Role Model
const mongoose = require('mongoose');
const RoleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String
});
module.exports = mongoose.model('Role', RoleSchema);