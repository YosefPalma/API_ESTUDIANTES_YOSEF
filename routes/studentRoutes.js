const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studiantesControllers.js');

// Rutas para estudiantes
router.get('/', studentController.getStudents);
router.get('/:id', studentController.getStudentById);
router.post('/', studentController.createStudent);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);
router.get('/:id/grades', studentController.getStudentWithGrades);


module.exports = router;
