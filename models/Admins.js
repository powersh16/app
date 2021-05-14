const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  privilege:{
    type:Number,
    default:0,
  }
});

const Admins = mongoose.model('Admins', AdminSchema);

module.exports = Admins;