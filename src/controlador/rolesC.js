import { obtenerRoles } from '../modelo/rolesModelo.js'



export const optenerRolesController = async (req,res) => {
    try{

        let respuesta = await obtenerRoles()

        if(!respuesta){
            return res.status(200).json({
                status: 'succes',
                message: 'No hay roles.',
            })
        }

        return res.status(200).json({
            status: 'succes',
            message: 'roles encontrados.',
            roles:respuesta
        })

    }catch(error){
        return res.status(500).json({
            status: 'Error',
            message: 'Ocurrio un error, contacte con el administrador del sistema.'
        })
    }
}