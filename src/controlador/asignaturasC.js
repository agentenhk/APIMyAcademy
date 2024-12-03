import {crearAsignaturaModel,obtenerAsignaturasModel,actualizarEstadoAsignatura} from '../modelo/asignaturasModelo.js'

export const crearAsignaturas = async (req,res) =>{
    let parametros = req.body

    let {nombre} = parametros;

    if(!nombre){
        return res.status(400).json({
            status: 'succes',
            message: 'Datos incompletas.'
        })
    }


    try{

        let respuesta = await crearAsignaturaModel(nombre)
        if(!respuesta){
            return res.status(400).json({
                status: 'Error',
                message: 'No se creo la asignatura.'
            })
        }

        return res.status(200).json({
            status: 'succes',
            message: 'asignatura creada.'
        })
        

    }catch(error){
        return res.status(500).json({
            status: 'error',
            message: 'Error de sistema contacta al administrador.',
            error
        })
    }

}

export const obtenerAsignaturas = async (req,res) =>{
    try{

        let respuesta = await obtenerAsignaturasModel()

        if(!respuesta){
            return res.status(200).json({
                status: 'succes',
                message: 'No hay asignaturas.',
            })
        }

        return res.status(200).json({
            status: 'succes',
            message: 'asignaturas encontradas.',
            asignaturas:respuesta
        })

    }catch(error){
        return res.status(500).json({
            status: 'Error',
            message: 'Ocurrio un error, contacte con el administrador del sistema.',
            error
        })
    }
}

export const actualizarEstadoAsig= async (req,res) =>{
    let parametros = req.body;
    let {id,estado} = parametros;
    console.log(id,estado)
    if(!id || !estado){
        return res.status(400).json({
            status: 'Error',
            message: 'Datos incompletos..',
        })
    }

    try{
        let respuesta = await actualizarEstadoAsignatura(id,estado)
        
        if(respuesta > 0){
            return res.status(200).json({
                status: 'succes',
                message: 'Asignatura actualizada..',
            })
        }
        return res.status(400).json({
            status: 'error',
            message: 'Asignatura no actualizada..',
        })


    }catch(error){
        return res.status(500).json({
            status: 'error',
            message: 'Contacta al administrador..',
            error
        })
    }

}