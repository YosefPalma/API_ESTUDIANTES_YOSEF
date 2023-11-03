// Configuración del servidor web utilizando Express.js y Sequelize para la base de datos
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sequelize = require('./config/Basededatos'); // Importa la conexión a la base de datos
const studentRoutes = require('./routes/studentRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
// Prueba la conexión a la base de datos
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida con éxito.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
})();

dotenv.config(); // Carga las variables de entorno desde un archivo .env

const app = express();

app.use(bodyParser.json());

// Rutas para estudiantes y calificaciones
app.use('/API/students', studentRoutes);
app.use('/API/grades', gradeRoutes);

// Manejo de errores
app.use((req, res, next) => {
  const error = new Error('Ruta no encontrada');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// Sincroniza la base de datos y luego inicia el servidor
sequelize.sync().then(() => {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
  });
});
