const multer = require('multer');
const fs = require('fs');
const path = require('path');

const dir = 'uploads/projects';

// Asegura que la carpeta exista
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

module.exports = upload;
