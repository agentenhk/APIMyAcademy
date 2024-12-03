import  express  from "express";
import usuarioRuta from './rutas/usuarioRutas.js'
import rolesRutas from './rutas/rolesRutas.js'
import cursoRuta from './rutas/cursoRutas.js'
import asignacionesRuta from './rutas/asignacionesRutas.js'
import asignaturaRuta from './rutas/asignaturaRutas.js'
import calificaRuta from './rutas/calificarRutas.js'
import perdoRuta from './rutas/periodoRuta.js'
import cors from "cors"; 

// Mensaje de bienvenida

console.log("API arrancada!!");


// Crear servidor node
const app = express();
/* let puerto = 3000 */

app.use(cors())

// Convertir los datos que lleguen en cada peticion datos del body a objetos js
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// rutas 

app.use('/api',usuarioRuta)
app.use('/api',rolesRutas)
app.use('/api',cursoRuta)
app.use('/api',asignacionesRuta)
app.use('/api',asignaturaRuta)
app.use('/api',calificaRuta)
app.use('/api',perdoRuta)


app.use((req,res,next) =>{
    res.status(404).json({
        status:"Error",
        message:"Esta ruta no existe"
    })
})

export default app;