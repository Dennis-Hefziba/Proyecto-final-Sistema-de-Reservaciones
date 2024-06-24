const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Role name is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Role = mongoose.model('Role', roleSchema);
module.exports = Role;

