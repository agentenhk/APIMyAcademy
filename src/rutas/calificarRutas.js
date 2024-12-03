import {Router} from 'express'
import { obtenerEstudiantesPorProfesor,obtenerCursosPorProfesor,crearCalificacion,actualizarCalificacion } from '../controlador/CalificarC.js';

const calificaRuta = Router();

// Ruta para obtener estudiantes asignados a un profesor
calificaRuta.get('/calificar/profesores/:id_usuario/:id_curso/estudiantes', obtenerEstudiantesPorProfesor);
calificaRuta.get('/calificar/profesor/:idProfesor/cursos', obtenerCursosPorProfesor);
calificaRuta.post('/calificar/crear', crearCalificacion);
calificaRuta.put('/calificar/actualizarCalificacion',actualizarCalificacion)


export default calificaRuta;
