import {obtenerAsignaciones,crearAsignacionModel,actualizarEstadoAsignacion,obtenerAsignacionesCursoEstu,crearAsignacionModelCursoEstu,crearAsignacionModelProfesorAsig,actualizarEstadoAsignacionAsigPro,obtenerAsignacionesAsignaProfe} from '../modelo/asignacionesModelo.js'



export const obtenerAsignacionesController = async (req,res) => {
    try{

        let respuesta = await obtenerAsignaciones()

        if(!respuesta){
            return res.status(200).json({
                status: 'succes',
                message: 'No hay asignaciones.',
            })
        }

        return res.status(200).json({
            status: 'succes',
            message: 'asignaciones encontradas.',
            asignaciones:respuesta
        })

    }catch(error){
        return res.status(500).json({
            status: 'Error',
            message: 'Ocurrio un error, contacte con el administrador del sistema.',
            error
        })
    }
}

export const crearAsignaciones = async (req,res) =>{
    let parametros = req.body

    let {id_usuario,id_curso} = parametros;

    if(!id_usuario || !id_curso){
        return res.status(400).json({
            status: 'succes',
            message: 'Datos incompletas.'
        })
    }

    try{

        let respuesta = await crearAsignacionModel(id_usuario,id_curso)
        if(!respuesta){
            return res.status(400).json({
                status: 'Error',
                message: 'No se creo la asignacion.'
            })
        }

        return res.status(200).json({
            status: 'succes',
            message: 'Asignacion creada.'
        })
        

    }catch(error){
        return res.status(500).json({
            status: 'error',
            message: 'Error de sistema contacta al administrador.'
        })
    }
}

export const actualizarEstado = async (req,res) =>{
    let parametros = req.body;
    let {id,estado} = parametros;
    
    if(!id || !estado){
        return res.status(400).json({
            status: 'Error',
            message: 'Datos incompletos..',
        })
    }

    try{
        let respuesta = await actualizarEstadoAsignacion(id,estado)
        
        if(respuesta > 0){
            return res.status(200).json({
                status: 'succes',
                message: 'Asignacion actualizada..',
            })
        }
        return res.status(400).json({
            status: 'error',
            message: 'Asignacion no actualizada..',
        })


    }catch(error){
        return res.status(500).json({
            status: 'error',
            message: 'Contacta al administrador..',
            error
        })
    }

}

export const obtenerAsignacionesCursoEstuController = async (req,res) => {
    try{

        let respuesta = await obtenerAsignacionesCursoEstu()

        if(!respuesta){
            return res.status(200).json({
                status: 'succes',
                message: 'No hay asignaciones.',
            })
        }

        return res.status(200).json({
            status: 'succes',
            message: 'asignaciones encontradas.',
            asignaciones:respuesta
        })

    }catch(error){
        return res.status(500).json({
            status: 'Error',
            message: 'Ocurrio un error, contacte con el administrador del sistema.',
            error
        })
    }
}

export const crearAsignacionesEstudianreCursos = async (req,res) =>{
    let parametros = req.body

    let {id_usuario,id_curso} = parametros;

    if(!id_usuario || !id_curso){
        return res.status(400).json({
            status: 'succes',
            message: 'Datos incompletas.'
        })
    }

    try{

        let respuesta = await crearAsignacionModelCursoEstu(id_usuario,id_curso)
        if(!respuesta){
            return res.status(400).json({
                status: 'Error',
                message: 'No se creo la asignacion.'
            })
        }

        return res.status(200).json({
            status: 'succes',
            message: 'Asignacion creada.'
        })
        

    }catch(error){
        return res.status(500).json({
            status: 'error',
            message: 'Error de sistema contacta al administrador.'
        })
    }
}


export const crearAsignacionesProfesoresasignaturas = async (req,res) =>{
    let parametros = req.body

    let {id_usuario,id_asignatura} = parametros;

    if(!id_usuario || !id_asignatura){
        return res.status(400).json({
            status: 'succes',
            message: 'Datos incompletas.'
        })
    }

    try{

        let respuesta = await crearAsignacionModelProfesorAsig(id_asignatura,id_usuario)
        if(!respuesta){
            return res.status(400).json({
                status: 'Error',
                message: 'No se creo la asignacion.'
            })
        }

        return res.status(200).json({
            status: 'succes',
            message: 'Asignacion creada.'
        })
        

    }catch(error){
        return res.status(500).json({
            status: 'error',
            message: 'Error de sistema contacta al administrador.'
        })
    }
}


export const actualizarEstadoAsigPro = async (req,res) =>{
    let parametros = req.body;
    let {id,estado} = parametros;
    
    if(!id || !estado){
        return res.status(400).json({
            status: 'Error',
            message: 'Datos incompletos..',
        })
    }

    try{
        let respuesta = await actualizarEstadoAsignacionAsigPro(id,estado)
        
        if(respuesta > 0){
            return res.status(200).json({
                status: 'succes',
                message: 'Asignacion actualizada..',
            })
        }
        return res.status(400).json({
            status: 'error',
            message: 'Asignacion no actualizada..',
        })


    }catch(error){
        return res.status(500).json({
            status: 'error',
            message: 'Contacta al administrador..',
            error
        })
    }

}


export const obtenerAsignacionesAsignaturasProfeController = async (req,res) => {
    try{

        let respuesta = await obtenerAsignacionesAsignaProfe()

        if(!respuesta){
            return res.status(200).json({
                status: 'succes',
                message: 'No hay asignaciones.',
            })
        }

        return res.status(200).json({
            status: 'succes',
            message: 'asignaciones encontradas.',
            asignaciones:respuesta
        })

    }catch(error){
        return res.status(500).json({
            status: 'Error',
            message: 'Ocurrio un error, contacte con el administrador del sistema.',
            error
        })
    }
}