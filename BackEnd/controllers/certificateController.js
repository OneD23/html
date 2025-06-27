const fs = require('fs');
const path = require('path');
const Certificate = require('../models/Certificate');

const getCertificates = async (req, res) => {
  try {
    const certs = await Certificate.find();
    res.json(certs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addCertificate = async (req, res) => {
  try {

    console.log('req.file:', req.file);
    console.log('req.body:', req.body);
    
    const { title } = req.body;
    const image = req.file ? `/uploads/certificates/${req.file.filename}` : '';
    const cert = new Certificate({ title, image });
    await cert.save();
    res.status(201).json(cert);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCertificate = async (req, res) => {
  try {
    const cert = await Certificate.findById(req.params.id);
    if (cert.image) {
      const imgPath = path.join(__dirname, '..', cert.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }
    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Certificado eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCertificates, addCertificate, deleteCertificate };
