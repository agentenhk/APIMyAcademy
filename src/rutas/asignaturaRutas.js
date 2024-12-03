import {Router} from 'express'
import {crearAsignaturas,obtenerAsignaturas,actualizarEstadoAsig} from '../controlador/asignaturasC.js'


const asignaturaRuta = Router();

asignaturaRuta.post('/asignaturas/crear',crearAsignaturas)
asignaturaRuta.get('/asignaturas/listar',obtenerAsignaturas)
asignaturaRuta.put('/asignaturas/actualizarestadoasig',actualizarEstadoAsig)


export default asignaturaRuta