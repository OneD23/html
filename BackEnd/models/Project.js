const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: String,
  image: String,
  description: String
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
