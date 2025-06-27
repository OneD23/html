const express = require('express');
const router = express.Router();
const upload = require('../config/multerCertificate');
const {
  getCertificates,
  addCertificate,
  deleteCertificate
} = require('../controllers/certificateController');

router.get('/', getCertificates);
router.post('/', upload.single('image'), addCertificate);
router.delete('/:id', deleteCertificate);

module.exports = router;
