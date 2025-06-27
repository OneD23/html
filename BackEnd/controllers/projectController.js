const Project = require('../models/Project');
const path = require('path');

// Obtener todos los proyectos
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Agregar nuevo proyecto
const addProject = async (req, res) => {
  try {
    const { title, url, description } = req.body;
    const image = req.file ? `/uploads/projects/${req.file.filename}` : '';

    const newProject = new Project({
      title,
      url,
      description,
      image
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar proyecto
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    res.json({ message: 'Proyecto eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar proyecto
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    // Traer proyecto actual
    const existing = await Project.findById(id);
    if (!existing) return res.status(404).json({ message: 'Proyecto no encontrado' });

    // Si viene nueva imagen, borrar anterior
    if (req.file && existing.image) {
      const oldPath = path.join(__dirname, '..', existing.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    // Si hay nueva imagen, actualizarla
    const updatedData = {
      ...req.body,
      image: req.file ? `/uploads/projects/${req.file.filename}` : existing.image
    };

    const updated = await Project.findByIdAndUpdate(id, updatedData, { new: true });
    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProjects,
  addProject,
  deleteProject,
  updateProject
};
