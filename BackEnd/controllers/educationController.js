const Education = require('../models/Education');

const getEducation = async (req, res) => {
  try {
    const list = await Education.find();
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addEducation = async (req, res) => {
  try {
    const nueva = new Education(req.body);
    await nueva.save();
    res.status(201).json(nueva);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteEducation = async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);
    res.json({ message: 'Eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getEducation, addEducation, deleteEducation };
