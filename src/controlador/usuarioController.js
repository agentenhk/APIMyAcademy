import { validarUsuario, obtenerPermisoModel, crearUsuarioModel, obtenerUsuariosModel,actualizarEstadoUsuario} from '../modelo/usuarioModelo.js'


export const login = async (req, res) => {
    let parametros = req.body

    if (!parametros.email || !parametros.password) {

        return res.status(400).json({

            status: 'Error',
            message: "rellene todo los campos",
            validar: 0
        })
    }
    try {
        let [respuesta] = await validarUsuario(parametros.email)

        if (respuesta.cantidad == 0) {

            return res.status(404).json({

                status: 'Error',
                message: 'No se encuentra el usuario en el sistema.',
                validar: 0
            })
        }

        if (parametros.password == respuesta.contrasena) {
            return res.status(200).json({

                status: 'succes',
                message: 'Ingreso exitoso!',
                validar: 1,
                usuario: {
                    idusuarios: respuesta.idusuarios,
                    nombre: respuesta.nombre,
                    apellido: respuesta.apellido,
                    correo_electronico: respuesta.correo_electronico,
                    fecha_registro: respuesta.fecha_registro,
                    estado: respuesta.estado,
                    perfil_idperfil: respuesta.perfil_idperfil
                }
            })

        } else {

            return res.status(400).json({

                status: 'Error',
                message: 'Contraseña incorrecta',
                validar: 0
            }
            )
        }
    } catch (error) {

        return res.status(500).json({
            status: 'Error',
            message: 'Ocurrio un error, contacte con el administrador del sistema.'


        })
    }

}

export const obtenerPermiso = async (req, res) => {
    // Recibir  el parametro del id de usuario por la url
    const idusuarios = req.params.idusuarios;
    if (!idusuarios) {
        return res.status(400).json({
            status: 'Error',
            message: "Ruta sin parametros"
        })
    }
    try {
        let [respuesta] = await obtenerPermisoModel(idusuarios)

        if (!respuesta) {

            return res.status(404).json({

                status: 'Error',
                message: 'No tienes permisos asignados.',
                validar: 0
            })
        }
        return res.status(200).json({
            status: 'succes',
            message: 'Permisos.',
            usuario: {
                idusuarios: respuesta.idusuarios,
                nombre: respuesta.nombre,
                apellido: respuesta.apellido,
                correo_electronico: respuesta.correo_electronico,
                fecha_registro: respuesta.fecha_registro,
                estado_usuario: respuesta.estado_usuario,
                activo: respuesta.activo,
                nombre_rol: respuesta.nombre_rol,
                cantidad: respuesta.cantidad
            }
        })

    } catch (error) {

        return res.status(500).json({
            status: 'Error',
            message: 'Ocurrio un error, contacte con el administrador del sistema.',
            error
        })
    }

}

export const crearUsuarios = async (req,res) =>{
    let parametros = req.body

    let {nombre,apellido,correo_electronico,contrasena,confirmar_contrasena,perfil_idperfil} = parametros;

    if(!nombre || !apellido || !correo_electronico || !contrasena || !confirmar_contrasena || !perfil_idperfil){
        return res.status(400).json({
            status: 'succes',
            message: 'Datos incompletas.'
        })
    }

    if(contrasena !== confirmar_contrasena){
        return res.status(400).json({
            status: 'error',
            message: 'No concuerda la contraseña.'
        })
    }

    try{

        let respuesta = await crearUsuarioModel(nombre,apellido,correo_electronico,contrasena,perfil_idperfil)
        if(!respuesta){
            return res.status(400).json({
                status: 'Error',
                message: 'No se creo el usuario.'
            })
        }

        return res.status(200).json({
            status: 'succes',
            message: 'Usuario creado.'
        })
        

    }catch(error){
        return res.status(500).json({
            status: 'error',
            message: 'Error de sistema contacta al administrador.'
        })
    }

}


export const obtenerUsuarios = async (req,res) =>{
    try{

        let respuesta = await obtenerUsuariosModel()

        if(!respuesta){
            return res.status(200).json({
                status: 'succes',
                message: 'No hay usuarios.',
            })
        }

        return res.status(200).json({
            status: 'succes',
            message: 'usuarios encontrados.',
            usuarios:respuesta
        })

    }catch(error){
        return res.status(500).json({
            status: 'Error',
            message: 'Ocurrio un error, contacte con el administrador del sistema.'
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
        let respuesta = await actualizarEstadoUsuario(id,estado)
        
        if(respuesta > 0){
            return res.status(200).json({
                status: 'succes',
                message: 'Usuario actualizado..',
            })
        }
        return res.status(400).json({
            status: 'error',
            message: 'Usuario no actualizado..',
        })


    }catch(error){
        return res.status(500).json({
            status: 'error',
            message: 'Contacta al administrador..',
            error
        })
    }

}


