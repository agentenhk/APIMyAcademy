import { pool } from "../conexion/bd.js";


export const obtenerAsignaciones = async () => {
    const query = `
        SELECT 
            cp.id,
            u.nombre AS profesor_nombre,
            c.nombre AS curso_nombre,
            CASE 
            WHEN cp.estado = 1 THEN 'Activo' 
            WHEN cp.estado = 2 THEN 'Inactivo' 
            ELSE 'Desconocido' -- Para manejar posibles valores no esperados
        END AS estado -- Renombrar el estado según el valor
        FROM 
            cursosprofesores cp
        JOIN 
            usuarios u ON cp.id_usuario = u.idusuarios 
        JOIN 
            cursos c ON cp.id_curso = c.idcursos
    `;
    try {
        const [respuesta] = await pool.query(query);
        return respuesta;
    } catch (error) {
        console.error("Error al obtener asignaciones:", error);
        throw error;
    }
};


export const crearAsignacionModel = async (id_usuario,id_curso)=>{
    const query = `
            INSERT INTO cursosprofesores (id_usuario, id_curso)
            VALUES (?, ?)
        `;
    const [result] = await pool.query(query, [id_usuario,id_curso]);
    return { id: result.insertId, message: 'Asignacion creada exitosamente' };
}

export const actualizarEstadoAsignacion = async (id, estado) => {
    const query = `
        UPDATE cursosprofesores
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


export const obtenerAsignacionesCursoEstu = async () => {
    const query = `
        SELECT 
            ce.id,
            u.nombre AS profesor_nombre,
            c.nombre AS curso_nombre,
            CASE 
            WHEN ce.estado = 1 THEN 'Activo' 
            WHEN ce.estado = 2 THEN 'Inactivo' 
            ELSE 'Desconocido' -- Para manejar posibles valores no esperados
        END AS estado -- Renombrar el estado según el valor
        FROM 
            cursoestudiante ce
        JOIN 
            usuarios u ON ce.id_usuario = u.idusuarios 
        JOIN 
            cursos c ON ce.id_curso = c.idcursos
    `;
    try {
        const [respuesta] = await pool.query(query);
        return respuesta;
    } catch (error) {
        console.error("Error al obtener asignaciones:", error);
        throw error;
    }
};

export const crearAsignacionModelCursoEstu = async (id_usuario,id_curso)=>{
    const query = `
            INSERT INTO cursoestudiante (id_usuario, id_curso)
            VALUES (?, ?)
        `;
    const [result] = await pool.query(query, [id_usuario,id_curso]);
    return { id: result.insertId, message: 'Asignacion creada exitosamente' };
}


export const crearAsignacionModelProfesorAsig = async (id_asignatura,id_usuario)=>{
    const query = `
            INSERT INTO usuarios_asignatura (id_asignatura,id_usuario)
            VALUES (?, ?)
        `;
    const [result] = await pool.query(query, [id_asignatura,id_usuario]);
    return { id: result.insertId, message: 'Asignacion creada exitosamente' };
}


export const actualizarEstadoAsignacionAsigPro = async (id, estado) => {
    const query = `
        UPDATE usuarios_asignatura
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


export const obtenerAsignacionesAsignaProfe = async () => {
    const query = `
        SELECT 
            us.id,
            u.nombre AS profesor_nombre,
            a.nombre_asignatura AS asignatura_nombre,
            CASE 
            WHEN us.estado = 1 THEN 'Activo' 
            WHEN us.estado = 2 THEN 'Inactivo' 
            ELSE 'Desconocido' -- Para manejar posibles valores no esperados
        END AS estado -- Renombrar el estado según el valor
        FROM 
            usuarios_asignatura us
        JOIN 
            usuarios u ON us.id_usuario = u.idusuarios 
        JOIN 
            asignatura a ON us.id_asignatura  = a.id
    `;
    try {
        const [respuesta] = await pool.query(query);
        return respuesta;
    } catch (error) {
        console.error("Error al obtener asignaciones:", error);
        throw error;
    }
};