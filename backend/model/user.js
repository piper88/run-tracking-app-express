const mongoose = require('mongoose');
const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const debug = require('debug')('run: userModel');

const userSchema = new mongoose.Schema({
  email: {type: String, required: [true, 'Email required']},
  password: {type: String, required: [true, 'Please enter password']}
})

module.exports = mongoose.model('User', userSchema);
