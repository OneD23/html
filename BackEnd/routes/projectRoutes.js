const express = require('express');
const router = express.Router();
const upload = require('../config/cloudinary'); // <--- CAMBIO aquí
const {
  getProjects,
  addProject,
  deleteProject,
  updateProject
} = require('../controllers/projectController');

router.post('/', upload.single('image'), addProject);
router.get('/', getProjects);
router.put('/:id', upload.single('image'), updateProject);
router.delete('/:id', deleteProject);

module.exports = router;
