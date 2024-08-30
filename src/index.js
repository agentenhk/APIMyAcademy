import {PORT} from './config.js'
import app from "./app.js";



// Poner el servidor a escuchar peticiones http
app.listen(PORT,()=>{
    console.log("Server ejecutado en el puerto "+PORT)
});
