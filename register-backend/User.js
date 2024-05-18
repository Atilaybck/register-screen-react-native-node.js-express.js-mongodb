// User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
}, {
  collection: 'users',
});

module.exports = mongoose.model('User', UserSchema);
