const Grade = require('../models/Grado');

// Controlador para obtener las calificaciones de un estudiante por su ID
const getGradesByStudentId = async (req, res) => {
  const studentId = req.params.id;
  try {
    const grade = await Grade.findAll({ where: { studentId } });
    res.json(grade);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las calificaciones del estudiante' });
  }
};

// Controlador para crear una nueva calificación para un estudiante
const createGrade = async (req, res) => {
  const studentId = req.params.id;
  const { course, score } = req.body;
  try {
    const grade = await Grade.create({ studentId, course, score });
    res.json(grade);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la calificación' });
  }
};

// Controlador para actualizar una calificación existente
const updateGrade = async (req, res) => {
  const gradeId = req.params.id;
  const { course, score } = req.body;
  try {
    const grade = await Grade.findByPk(gradeId);
    if (grade) {
      grade.course = course;
      grade.score = score;
      await grade.save();
      res.json(grade);
    } else {
      res.status(404).json({ error: 'Calificación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la calificación' });
  }
};

// Controlador para eliminar una calificación por su ID
const deleteGrade = async (req, res) => {
  const gradeId = req.params.id;
  try {
    const grade = await Grade.findByPk(gradeId);
    if (grade) {
      await grade.destroy();
      res.json({ message: 'Calificación eliminada con éxito' });
    } else {
      res.status(404).json({ error: 'Calificación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la calificación' });
  }
};

module.exports = {
  getGradesByStudentId,
  createGrade,
  updateGrade,
  deleteGrade,
};
