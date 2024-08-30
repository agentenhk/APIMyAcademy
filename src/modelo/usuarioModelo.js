import { pool } from "../conexion/bd.js";


export const validarUsuario = async(correo) =>{
    const [respuesta] = await pool.query('SELECT *, COUNT(*) cantidad FROM usuarios WHERE correo_electronico = ? LIMIT 1',[correo]);
    return respuesta;
}


