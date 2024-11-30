import {Router} from 'express'
import {crearCurso,obtenerCursos,actualizarEstadoCur} from '../controlador/cursoC.js'


const cursoRuta = Router();

cursoRuta.post('/cursos/crear',crearCurso)
cursoRuta.get('/cursos/listar',obtenerCursos)
cursoRuta.put('/cursos/actualizarestadocur',actualizarEstadoCur)


export default cursoRuta