import { crearPeriodoModel,obtenerPeriodosModel,actualizarEstadoPeriodos } from '../modelo/periodoModelo.js'




export const crearPeriodo = async (req,res) =>{
    let parametros = req.body

    let {nombre} = parametros;

    if(!nombre){
        return res.status(400).json({
            status: 'succes',
            message: 'Datos incompletas.'
        })
    }


    try{

        let respuesta = await crearPeriodoModel(nombre)
        if(!respuesta){
            return res.status(400).json({
                status: 'Error',
                message: 'No se creo el periodo.'
            })
        }

        return res.status(200).json({
            status: 'succes',
            message: 'periodo creado.'
        })
        

    }catch(error){
        return res.status(500).json({
            status: 'error',
            message: 'Error de sistema contacta al administrador.'
        })
    }

}


export const obtenerPeriodo = async (req,res) =>{
    try{

        let respuesta = await obtenerPeriodosModel()

        if(!respuesta){
            return res.status(200).json({
                status: 'succes',
                message: 'No hay periodos.',
            })
        }

        return res.status(200).json({
            status: 'succes',
            message: 'periodos encontrados.',
            periodos:respuesta
        })

    }catch(error){
        return res.status(500).json({
            status: 'Error',
            message: 'Ocurrio un error, contacte con el administrador del sistema.',
            error
        })
    }
}

export const actualizarEstadoPer = async (req,res) =>{
    let parametros = req.body;
    let {id,estado} = parametros;
    if(!id || !estado){
        return res.status(400).json({
            status: 'Error',
            message: 'Datos incompletos..',
        })
    }

    try{
        let respuesta = await actualizarEstadoPeriodos(id,estado)
        
        if(respuesta > 0){
            return res.status(200).json({
                status: 'succes',
                message: 'Periodo actualizado..',
            })
        }
        return res.status(400).json({
            status: 'error',
            message: 'Periodo no actualizado..',
        })


    }catch(error){
        return res.status(500).json({
            status: 'error',
            message: 'Contacta al administrador..',
            error
        })
    }

}