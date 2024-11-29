import {Router} from 'express'
import {login,obtenerPermiso,crearUsuarios,obtenerUsuarios,actualizarEstado} from '../controlador/usuarioController.js'


const usuarioRuta = Router();

usuarioRuta.post('/usuario/login',login)
usuarioRuta.get('/usuario/obtenerPermiso/:idusuarios',obtenerPermiso)
usuarioRuta.post('/usuario/crear',crearUsuarios)
usuarioRuta.get('/usuario/listar',obtenerUsuarios)
usuarioRuta.put('/usuario/actualizarestado',actualizarEstado)


export default usuarioRuta