import {Router} from 'express'
import {login,obtenerPermiso} from '../controlador/usuarioController.js'


const usuarioRuta = Router();

usuarioRuta.post('/usuario/login',login)
usuarioRuta.get('/usuario/obtenerPermiso/:idusuarios',obtenerPermiso)


export default usuarioRuta