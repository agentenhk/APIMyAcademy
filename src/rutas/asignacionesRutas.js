import {Router} from 'express'
import {obtenerAsignacionesController,crearAsignaciones,actualizarEstado,obtenerAsignacionesCursoEstuController,crearAsignacionesEstudianreCursos,crearAsignacionesProfesoresasignaturas,actualizarEstadoAsigPro,obtenerAsignacionesAsignaturasProfeController} from '../controlador/asignacionesContoller.js'


const asignacionesRuta = Router();

asignacionesRuta.get('/asignaciones/listar',obtenerAsignacionesController)
asignacionesRuta.post('/asignaciones/crear',crearAsignaciones)
asignacionesRuta.put('/asignaciones/actualizar',actualizarEstado)
asignacionesRuta.get('/asignaciones/listar/estudiante',obtenerAsignacionesCursoEstuController)
asignacionesRuta.post('/asignaciones/crear/estudiantecurso',crearAsignacionesEstudianreCursos)
asignacionesRuta.post('/asignaciones/crear/profesorasignatura',crearAsignacionesProfesoresasignaturas)
asignacionesRuta.put('/asignaciones/actualizar/asigpro',actualizarEstadoAsigPro)
asignacionesRuta.get('/asignaciones/listar/asignaturasprofe',obtenerAsignacionesAsignaturasProfeController)


export default asignacionesRuta