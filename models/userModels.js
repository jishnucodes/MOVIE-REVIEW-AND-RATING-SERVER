const mongoose = require('mongoose');
const modelOptions = require('./modelOption.js');
const { Schema } = mongoose;
const { reviewSchema } = require('./reviewModel');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },

}, modelOptions);

const User = mongoose.model('User', userSchema);

module.exports = User;
