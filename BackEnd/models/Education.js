const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  title: String,
  institution: String,
  years: String
});

module.exports = mongoose.model('Education', educationSchema);
