import { pool } from "../conexion/bd.js";


export const validarUsuario = async(correo) =>{
    const [respuesta] = await pool.query('SELECT *, COUNT(*) cantidad FROM usuarios WHERE correo_electronico = ? LIMIT 1',[correo]);
    return respuesta;
}

export const obtenerPermisoModel = async (idusuarios) => {
    const query = `
        SELECT 
            u.idusuarios, u.nombre, u.apellido, u.correo_electronico, u.fecha_registro, u.estado AS estado_usuario,
            p.estado AS activo, 
            r.nombre_rol,
            (SELECT COUNT(*) FROM perfil p2 WHERE p2.idperfil = p.idperfil) AS cantidad
        FROM usuarios u
        JOIN perfil p ON u.perfil_idperfil = p.idperfil
        JOIN rol r ON p.rol_idrol = r.idrol
        WHERE u.idusuarios = ? 
        LIMIT 1
    `;

    const [respuesta] = await pool.query(query, [idusuarios]);
    return respuesta;
};



