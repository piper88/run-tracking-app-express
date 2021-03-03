const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {type: String, required: [true, 'Email required']},
  password: {type: String, required: [true, 'Please enter password']}
})

module.exports = mongoose.model('User', userSchema);
