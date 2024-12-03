import {Router} from 'express'
import {crearPeriodo,obtenerPeriodo,actualizarEstadoPer} from '../controlador/periodosC.js'


const perdoRuta = Router();

perdoRuta.post('/periodos/crear',crearPeriodo)
perdoRuta.get('/periodos/listar',obtenerPeriodo)
perdoRuta.put('/periodos/actualizarestadoper',actualizarEstadoPer)


export default perdoRuta