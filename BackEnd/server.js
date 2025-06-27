const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const profileRoutes = require('./routes/profileRoutes');
const projectRoutes = require('./routes/projectRoutes');
const educationRoutes = require('./routes/educationRoutes');
const certificateRoutes = require('./routes/certificateRoutes');


const app = express();
app.use(cors());
app.use(express.json());


app.use('/uploads', express.static('uploads'));


// Rutas


app.use('/api/profile', profileRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/certificates', certificateRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
