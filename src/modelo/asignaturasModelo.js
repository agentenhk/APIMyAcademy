import { pool } from "../conexion/bd.js";


export const crearAsignaturaModel = async (nombre) => {
    const query = `
            INSERT INTO asignatura (nombre_asignatura)
            VALUES (?)
        `;
    const [result] = await pool.query(query, [nombre]);
    return { id: result.insertId, message: 'Usuario creado exitosamente' };
}

export const obtenerAsignaturasModel = async () => {
    const query = `
    SELECT 
        a.id, 
        a.nombre_asignatura, 
        a.fecha_registro,
        CASE 
            WHEN a.estado = 1 THEN 'Activo' 
            WHEN a.estado = 2 THEN 'Inactivo' 
            ELSE 'Desconocido' -- Para manejar posibles valores no esperados
        END AS estado -- Renombrar el estado según el valor
    FROM 
        asignatura a
`;
    const [respuesta] = await pool.query(query);
    return respuesta;
};

export const actualizarEstadoAsignatura = async (id, estado) => {
    const query = `
        UPDATE asignatura
        SET estado = ?
        WHERE id = ?
    `;
    try {
        const [resultado] = await pool.query(query, [estado, id]);
        return resultado.affectedRows
    } catch (error) {
        console.error("Error al actualizar el estado del usuario:", error);
        return { success: false, message: "Ocurrió un error al intentar actualizar el estado." };
    }
};