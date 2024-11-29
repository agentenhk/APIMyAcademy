import { pool } from "../conexion/bd.js";


export const obtenerRoles = async() =>{
    const [respuesta] = await pool.query('SELECT * FROM rol WHERE estado = 1');
    return respuesta;
}