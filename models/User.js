const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//dfd
// Create our Schema
const UserSchema = new Schema({
  mobilenumber: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },

  lastname: {
    type: String,
    required: true
  },

  createdate: {
    type: Date,
    default: Date.now
  },

  OTPsent: {
    type: Boolean,
    default: false
  },

  OTPconfirmed: {
    type: Boolean,
    default: false
  },

  isActive: {
    type: Boolean,
    default: false
  }
});

mongoose.model('user', UserSchema);
