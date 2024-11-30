import { crearCursoModel,obtenerCursosModel,actualizarEstadoCursos } from '../modelo/cursoamaodel.js'




export const crearCurso = async (req,res) =>{
    let parametros = req.body

    let {nombre} = parametros;

    if(!nombre){
        return res.status(400).json({
            status: 'succes',
            message: 'Datos incompletas.'
        })
    }


    try{

        let respuesta = await crearCursoModel(nombre)
        if(!respuesta){
            return res.status(400).json({
                status: 'Error',
                message: 'No se creo el curso.'
            })
        }

        return res.status(200).json({
            status: 'succes',
            message: 'curso creado.'
        })
        

    }catch(error){
        return res.status(500).json({
            status: 'error',
            message: 'Error de sistema contacta al administrador.'
        })
    }

}


export const obtenerCursos = async (req,res) =>{
    try{

        let respuesta = await obtenerCursosModel()

        if(!respuesta){
            return res.status(200).json({
                status: 'succes',
                message: 'No hay cursos.',
            })
        }

        return res.status(200).json({
            status: 'succes',
            message: 'cursos encontrados.',
            usuarios:respuesta
        })

    }catch(error){
        return res.status(500).json({
            status: 'Error',
            message: 'Ocurrio un error, contacte con el administrador del sistema.',
            error
        })
    }
}

export const actualizarEstadoCur = async (req,res) =>{
    let parametros = req.body;
    let {id,estado} = parametros;
    if(!id || !estado){
        return res.status(400).json({
            status: 'Error',
            message: 'Datos incompletos..',
        })
    }

    try{
        let respuesta = await actualizarEstadoCursos(id,estado)
        
        if(respuesta > 0){
            return res.status(200).json({
                status: 'succes',
                message: 'Curso actualizado..',
            })
        }
        return res.status(400).json({
            status: 'error',
            message: 'Curso no actualizado..',
        })


    }catch(error){
        return res.status(500).json({
            status: 'error',
            message: 'Contacta al administrador..',
            error
        })
    }

}