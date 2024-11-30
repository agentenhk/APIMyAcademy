import { pool } from "../conexion/bd.js";


export const crearCursoModel = async (nombre) => {
    const query = `
            INSERT INTO cursos (nombre)
            VALUES (?)
        `;
    const [result] = await pool.query(query, [nombre]);
    return { id: result.insertId, message: 'Usuario creado exitosamente' };
}


export const obtenerCursosModel = async () => {
    const query = `
    SELECT 
        c.idcursos, 
        c.nombre, 
        c.fecha_registro,
        CASE 
            WHEN c.estado = 1 THEN 'Activo' 
            WHEN c.estado = 2 THEN 'Inactivo' 
            ELSE 'Desconocido' -- Para manejar posibles valores no esperados
        END AS estado -- Renombrar el estado según el valor
    FROM 
        cursos c
    WHERE 
        c.estado = 1
`;
    const [respuesta] = await pool.query(query);
    return respuesta;
};


export const actualizarEstadoCursos = async (id, estado) => {
    const query = `
        UPDATE cursos
        SET estado = ?
        WHERE idcursos = ?
    `;
    try {
        const [resultado] = await pool.query(query, [estado, id]);
        return resultado.affectedRows
    } catch (error) {
        console.error("Error al actualizar el estado del usuario:", error);
        return { success: false, message: "Ocurrió un error al intentar actualizar el estado." };
    }
};