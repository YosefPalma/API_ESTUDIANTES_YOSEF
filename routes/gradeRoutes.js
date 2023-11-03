const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradoController');

// Rutas para calificaciones
router.get('/:id', gradeController.getGradesByStudentId);
router.post('/:id', gradeController.createGrade);
router.put('/:id', gradeController.updateGrade);
router.delete('/:id', gradeController.deleteGrade);

module.exports = router;
