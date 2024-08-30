import {Router} from 'express'
import {login} from '../controlador/usuarioController.js'


const usuarioRuta = Router();

usuarioRuta.post('/usuario/login',login)


export default usuarioRuta