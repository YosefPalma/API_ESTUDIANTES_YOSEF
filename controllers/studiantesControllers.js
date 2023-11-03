const Student = require('../models/Studiante');
const Grade = require('../models/Grado');

// Controlador para obtener una lista de estudiantes
const getStudents = async (req, res) => {
  try {
    const student = await Student.findAll();
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la lista de estudiantes' });
  }
};

// Controlador para obtener un estudiante por su ID
const getStudentById = async (req, res) => {
  const studentId = req.params.id;
  try {
    const student = await Student.findByPk(studentId);
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ error: 'Estudiante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el estudiante' });
  }
};

// Controlador para crear un nuevo estudiante
const createStudent = async (req, res) => {
  const { name } = req.body;
  try {
    const student = await Student.create({ name });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el estudiante' });
  }
};

// Controlador para actualizar un estudiante existente
const updateStudent = async (req, res) => {
  const studentId = req.params.id;
  const { name } = req.body;
  try {
    const student = await Student.findByPk(studentId);
    if (student) {
      student.name = name;
      await student.save();
      res.json(student);
    } else {
      res.status(404).json({ error: 'Estudiante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el estudiante' });
  }
};

// Controlador para eliminar un estudiante por su ID
const deleteStudent = async (req, res) => {
  const studentId = req.params.id;
  try {
    const student = await Student.findByPk(studentId);
    if (student) {
      await student.destroy();
      res.json({ message: 'Estudiante eliminado con éxito' });
    } else {
      res.status(404).json({ error: 'Estudiante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el estudiante' });
  }
};
const getGradesByStudentId = async (req, res) => {
    const studentId = req.params.id; // Obtén el ID del estudiante desde los parámetros de la URL
  
    try {
      const grades = await Grade.findAll({
        where: { StudentId: studentId },
      });
  
      // Responde con las calificaciones encontradas
      res.json(grades);
    } catch (error) {
      // Manejo de errores
      res.status(500).json({ error: 'Error al obtener las calificaciones del estudiante' });
    }
  };

  

  const getStudentWithGrades = async (req, res) => {
    const studentId = req.params.id;
  
    try {
      // Utiliza el método `findOne` para obtener un estudiante por ID
      const student = await Student.findOne({ where: { id: studentId } });
  
      if (!student) {
        return res.status(404).json({ error: 'Estudiante no encontrado' });
      }
  
      // Luego, busca las calificaciones (grades) del estudiante
      const grades = await Grade.findAll({ where: { studentId } });
  
      // Agrega las calificaciones al objeto del estudiante
      student.dataValues.grades = grades;
  
      res.json(student);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el estudiante y sus calificaciones' });
    }
  };
  

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentWithGrades,
};
