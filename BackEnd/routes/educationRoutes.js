const express = require('express');
const router = express.Router();
const {
  getEducation,
  addEducation,
  deleteEducation
} = require('../controllers/educationController');

router.get('/', getEducation);
router.post('/', addEducation);
router.delete('/:id', deleteEducation);

module.exports = router;
