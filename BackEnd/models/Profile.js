/**
 * @typedef {import("mongoose").Model} Model
 */

const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: String,
  title: String,
  description: String,
  contactEmail: String,
  socialLinks: {
    github: String,
    linkedin: String,
    portfolio: String
  }
});

/** @type {import('mongoose').Model} */
const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
