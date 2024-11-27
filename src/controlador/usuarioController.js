import { validarUsuario, obtenerPermisoModel } from '../modelo/usuarioModelo.js'


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

        if (respuesta.cantidad == 0) {

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


