const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false,
        trim: true
    },
    authorization_key: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }

});


const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin