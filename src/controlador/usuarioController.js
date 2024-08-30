import {validarUsuario} from '../modelo/usuarioModelo.js'


export const login = async (req,res) =>{ 
    let parametros = req.body

    if(!parametros.email || !parametros.password){

        return res.status(400).json({

            status: 'Error',
            message: "rellene todo los campos",
            validar: 0
        })
    }
    try {
        let [respuesta] = await validarUsuario(parametros.email)

        if(respuesta.cantidad == 0){

            return res.status(404).json({

                status: 'Error' ,
                message: 'No se encuentra el usuario en el sistema.',
                validar: 0
            })
        }
        
        if(parametros.password == respuesta.contrasena){
            return res.status(200).json({

                status: 'succes',
                message: 'Ingreso exitoso!',
                validar: 1
                
            })
            
        }else{

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


