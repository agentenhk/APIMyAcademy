import { pool } from "../conexion/bd.js";


export const obtenerEstudiantesPorProfesorModel = async (id_usuario, id_curso) => {
    const query = `
      SELECT 
          ce.id_usuario AS estudiante_id,
          e.nombre AS estudiante_nombre,
          e.apellido AS estudiante_apellido,
          ua.id_asignatura,
          a.nombre_asignatura,
          IFNULL(c.primer_periodo, 0) AS primer_periodo,
          IFNULL(c.segundo_periodo, 0) AS segundo_periodo,
          IFNULL(c.tercer_periodo, 0) AS tercer_periodo,
          IFNULL(c.cuarto_periodo, 0) AS cuarto_periodo,
          IFNULL(c.nota_final, 0) AS nota_final
      FROM 
          cursosprofesores cp
      INNER JOIN 
          cursoestudiante ce ON cp.id_curso = ce.id_curso
      INNER JOIN 
          usuarios e ON ce.id_usuario = e.idusuarios AND e.perfil_idperfil = 3 -- Solo estudiantes
      INNER JOIN 
          usuarios_asignatura ua ON cp.id_usuario = ua.id_usuario -- Relación profesor-asignatura
      INNER JOIN 
          asignatura a ON ua.id_asignatura = a.id
      LEFT JOIN
          calificaciones c ON c.id_estudiante = ce.id_usuario AND c.id_curso = cp.id_curso AND c.id_asignatura = ua.id_asignatura
      WHERE 
          cp.id_usuario = ? -- ID del profesor
          AND cp.id_curso = ? 
          AND cp.estado = 1 
          AND ce.estado = 1;
    `;
    const [respuesta] = await pool.query(query, [id_usuario, id_curso]);
    return respuesta;
};
  


export const obtenerCursosPorProfesorModel = async (idProfesor) => {
    const query = `
    SELECT 
        c.idcursos,
        c.nombre
    FROM 
        cursosprofesores cp
    INNER JOIN 
        cursos c ON cp.id_curso = c.idcursos
    WHERE 
        cp.id_usuario = ? -- ID del profesor
        AND cp.estado = 1; -- Solo cursos activos
    `;
    const [respuesta] = await pool.query(query, [idProfesor]);
    return respuesta;
};

export const crearCalificacionModel = async (id_estudiante,id_curso,id_asignatura,id_profesor,id_periodo,primer_periodo,segundo_periodo,tercer_periodo,cuarto_periodo,nota_final) => {
    const query = `
            INSERT INTO calificaciones (id_estudiante,id_curso,id_asignatura,id_profesor,id_periodo,primer_periodo,segundo_periodo,tercer_periodo,cuarto_periodo,nota_final)
            VALUES (?,?,?,?,?,?,?,?,?,?)
        `;
    const [result] = await pool.query(query, [id_estudiante,id_curso,id_asignatura,id_profesor,id_periodo,primer_periodo,segundo_periodo,tercer_periodo,cuarto_periodo,nota_final]);
    return { id: result.insertId, message: 'Calificacion creado exitosamente' };
}


export const actualizarDatosCalifi = async (
    id_estudiante,
    id_curso,
    id_asignatura,
    id_profesor,
    id_periodo,
    primer_periodo,
    segundo_periodo,
    tercer_periodo,
    cuarto_periodo,
    nota_final
) => {
    const query = `
        UPDATE calificaciones
        SET 
            primer_periodo = ?, 
            segundo_periodo = ?, 
            tercer_periodo = ?, 
            cuarto_periodo = ?, 
            nota_final = ?
        WHERE 
            id_estudiante = ? 
            AND id_curso = ? 
            AND id_asignatura = ? 
            AND id_profesor = ? 
            AND id_periodo = ?;
    `;
    try {
        const [resultado] = await pool.query(query, [
            primer_periodo, 
            segundo_periodo, 
            tercer_periodo, 
            cuarto_periodo, 
            nota_final, 
            id_estudiante, 
            id_curso, 
            id_asignatura, 
            id_profesor, 
            id_periodo,
        ]);
        return resultado.affectedRows
    } catch (error) {
        return { success: false, message: "Ocurrió un error al intentar actualizar las calificaciones." };
    }
};


export const obtenerAsignaturasYNotasPorEstudiante = async (idusuarios) => {
    const query = `
        SELECT 
            c.id,
            a.id AS id_asignatura,
            a.nombre_asignatura,
            IFNULL(c.primer_periodo, 0) AS primer_periodo,
            IFNULL(c.segundo_periodo, 0) AS segundo_periodo,
            IFNULL(c.tercer_periodo, 0) AS tercer_periodo,
            IFNULL(c.cuarto_periodo, 0) AS cuarto_periodo,
            IFNULL(c.nota_final, 0) AS nota_final
        FROM 
            calificaciones c
        INNER JOIN 
            asignatura a ON c.id_asignatura = a.id
        WHERE 
            c.id_estudiante = ?;
    `;
    try {
        const [resultado] = await pool.query(query, [idusuarios]);
        return resultado;
    } catch (error) {
        console.error('Error al obtener asignaturas y notas:', error);
        throw error; // Maneja el error según tu lógica
    }
};

