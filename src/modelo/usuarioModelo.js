import { pool } from "../conexion/bd.js";


export const validarUsuario = async (correo) => {
    const [respuesta] = await pool.query('SELECT *, COUNT(*) cantidad FROM usuarios WHERE correo_electronico = ? LIMIT 1', [correo]);
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


export const crearUsuarioModel = async (nombre, apellido, correo_electronico, contrasena, perfil_idperfil) => {
    const query = `
            INSERT INTO usuarios (nombre, apellido, correo_electronico, contrasena, perfil_idperfil)
            VALUES (?, ?, ?, ?, ?)
        `;
    const [result] = await pool.query(query, [nombre, apellido, correo_electronico, contrasena, perfil_idperfil]);
    return { id: result.insertId, message: 'Usuario creado exitosamente' };
}


export const obtenerUsuariosModel = async () => {
    const query = `
    SELECT 
        u.idusuarios, 
        u.nombre, 
        u.apellido, 
        u.correo_electronico, 
        u.fecha_registro, 
        CASE 
            WHEN u.estado = 1 THEN 'Activo' 
            WHEN u.estado = 2 THEN 'Inactivo' 
            ELSE 'Desconocido' -- Para manejar posibles valores no esperados
        END AS estado, -- Renombrar el estado según el valor
        u.perfil_idperfil,
        r.nombre_rol -- El campo del nombre del rol desde la tabla rol
    FROM 
        usuarios u
    INNER JOIN 
        perfil p ON u.perfil_idperfil = p.idperfil
    INNER JOIN 
        rol r ON p.rol_idrol = r.idrol
    WHERE 
        u.estado IN (1, 2); -- Filtrar solo usuarios con estado válido (opcional)
`;
    const [respuesta] = await pool.query(query);
    return respuesta;
};


export const actualizarEstadoUsuario = async (id, estado) => {
    const query = `
        UPDATE usuarios
        SET estado = ?
        WHERE idusuarios = ?
    `;
    try {
        const [resultado] = await pool.query(query, [estado, id]);
        return resultado.affectedRows
    } catch (error) {
        console.error("Error al actualizar el estado del usuario:", error);
        return { success: false, message: "Ocurrió un error al intentar actualizar el estado." };
    }
};




