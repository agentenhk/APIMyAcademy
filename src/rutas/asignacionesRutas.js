import {Router} from 'express'
import {obtenerAsignacionesController,crearAsignaciones,actualizarEstado,obtenerAsignacionesCursoEstuController,crearAsignacionesEstudianreCursos} from '../controlador/asignacionesContoller.js'


const asignacionesRuta = Router();

asignacionesRuta.get('/asignaciones/listar',obtenerAsignacionesController)
asignacionesRuta.post('/asignaciones/crear',crearAsignaciones)
asignacionesRuta.put('/asignaciones/actualizar',actualizarEstado)
asignacionesRuta.get('/asignaciones/listar/estudiante',obtenerAsignacionesCursoEstuController)
asignacionesRuta.post('/asignaciones/crear/estudiantecurso',crearAsignacionesEstudianreCursos)


export default asignacionesRuta