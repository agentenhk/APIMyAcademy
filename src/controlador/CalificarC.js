import {obtenerEstudiantesPorProfesorModel,obtenerCursosPorProfesorModel,crearCalificacionModel,actualizarDatosCalifi,obtenerAsignaturasYNotasPorEstudiante} from '../modelo/calificarModelo.js'



export const obtenerEstudiantesPorProfesor = async (req, res) => {
    try {
        const { id_usuario, id_curso } = req.params;

        if (!id_usuario || !id_curso) {
            return res.status(400).json({ error: 'El ID del profesor y curso es obligatorio.' });
        }

        const estudiantes = await obtenerEstudiantesPorProfesorModel(id_usuario,id_curso);

        if (!estudiantes.length) {
            return res.status(404).json({ mensaje: 'No se encontraron estudiantes para este profesor.' });
        }

        return res.status(200).json({
            status: 'succes',
            message: 'Estudiantes encontrados.',
            estudiantes
        })
    } catch (error) {
        console.error('Error al obtener estudiantes:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};


export const obtenerCursosPorProfesor = async (req, res) => {
    try {
        const { idProfesor } = req.params;

        if (!idProfesor) {
            return res.status(400).json({ error: 'El ID del profesor es obligatorio.' });
        }

        const cursos = await obtenerCursosPorProfesorModel(idProfesor);

        if (!cursos.length) {
            return res.status(404).json({ mensaje: 'No se encontraron cursos para este profesor.' });
        }

        return res.status(200).json({
            status: 'succes',
            message: 'Cursos encontrados.',
            cursos
        })
    } catch (error) {
        console.error('Error al obtener estudiantes:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

export const crearCalificacion = async (req,res) =>{
    let parametros = req.body
    let {id_estudiante,
        id_curso,
        id_asignatura,
        id_profesor,
        id_periodo,
        primer_periodo,
        segundo_periodo,
        tercer_periodo,
        cuarto_periodo,
        nota_final} = parametros;
        console.log(parametros)
    
    try{

        let respuesta = await crearCalificacionModel(id_estudiante,
            id_curso,
            id_asignatura,
            id_profesor,
            id_periodo,
            primer_periodo,
            segundo_periodo,
            tercer_periodo,
            cuarto_periodo,
            nota_final)
        if(!respuesta){
            return res.status(400).json({
                status: 'Error',
                message: 'No se creo la calificacion.'
            })
        }

        return res.status(200).json({
            status: 'succes',
            message: 'calificacion creada.'
        })
        

    }catch(error) {
        console.error('Error al crear calificación:', error); // Mostrar el error en el servidor
        return res.status(500).json({
            status: 'error',
            message: 'Error de sistema contacta al administrador.',
            error: error.message || error // Incluir el mensaje de error
        });
    }

}

export const actualizarCalificacion = async (req,res) =>{
    let parametros = req.body
    let {id_estudiante,
        id_curso,
        id_asignatura,
        id_profesor,
        id_periodo,
        primer_periodo,
        segundo_periodo,
        tercer_periodo,
        cuarto_periodo,
        nota_final} = parametros;

    if(!id_estudiante || !id_curso || !id_asignatura || !id_profesor || !id_periodo || !primer_periodo || !segundo_periodo || !tercer_periodo || !cuarto_periodo || !nota_final){
        return res.status(400).json({
            status: 'succes',
            message: 'Datos incompletas.'
        })
    }

    try{
        let respuesta = await actualizarDatosCalifi(id_estudiante,
            id_curso,
            id_asignatura,
            id_profesor,
            id_periodo,
            primer_periodo,
            segundo_periodo,
            tercer_periodo,
            cuarto_periodo,
            nota_final)
        
        if(respuesta > 0){
            return res.status(200).json({
                status: 'succes',
                message: 'Calificacion actualizada..',
            })
        }
        return res.status(400).json({
            status: 'error',
            message: 'Calificacion no actualizado..',
        })


    }catch(error){
        return res.status(500).json({
            status: 'error',
            message: 'Contacta al administrador..',
            error
        })
    }

}

export const obtenerNotasPorEstudiante = async (req, res) => {
    try {
        const { idusuarios } = req.params;

        if (!idusuarios) {
            return res.status(400).json({ error: 'El ID del estudiante es obligatorio.' });
        }

        const notas = await obtenerAsignaturasYNotasPorEstudiante(idusuarios);

        if (!notas.length) {
            return res.status(404).json({ mensaje: 'No se encontraron notas para este estudiante.' });
        }

        return res.status(200).json({
            status: 'succes',
            message: 'Notas encontradas.',
            notas
        })
    } catch (error) {
        console.error('Error al obtener estudiantes:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};
