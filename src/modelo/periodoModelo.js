import { pool } from "../conexion/bd.js";


export const crearPeriodoModel = async (nombre) => {
    const query = `
            INSERT INTO periodo (nombre)
            VALUES (?)
        `;
    const [result] = await pool.query(query, [nombre]);
    return { id: result.insertId, message: 'Periodo creado exitosamente' };
}


export const obtenerPeriodosModel = async () => {
    const query = `
    SELECT 
        p.id, 
        p.nombre_periodo, 
        p.fecha_registro,
        CASE 
            WHEN p.estado = 1 THEN 'Activo' 
            WHEN p.estado = 2 THEN 'Inactivo' 
            ELSE 'Desconocido' -- Para manejar posibles valores no esperados
        END AS estado -- Renombrar el estado según el valor
    FROM 
        periodo p
    WHERE 
        p.estado = 1
`;
    const [respuesta] = await pool.query(query);
    return respuesta;
};


export const actualizarEstadoPeriodos = async (id, estado) => {
    const query = `
        UPDATE periodo
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