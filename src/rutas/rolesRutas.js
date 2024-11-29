import {Router} from 'express'
import {optenerRolesController} from '../controlador/rolesC.js'



const rolesRuta = Router();


rolesRuta.get('/roles/usuario',optenerRolesController)


export default rolesRuta