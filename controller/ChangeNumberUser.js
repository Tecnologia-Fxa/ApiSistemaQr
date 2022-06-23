/* Archivo que contiene el metodo que cambia el nuemro del usuario al momento de ser registrado en la bd */

//Importamos el modelo de codigo de descuento
const CodigoDescuentoModel = require("../database/models/CodigoDescuentoModel")

//Importamos el modelo de usuario
const UsuarioModel = require("../database/models/UsuarioModel")

//Importamos la funcion que facilita el envio del codigo via sms
const { sendSMSCode } = require("../helpers/sendSms")

//Funcion que permite cambiar el número y enviar un mensaje de texto en el proceso
const ChangeNumberUser = async(req,res)=>{
        //Obtenemos de la consulta el telefono anterior y la actualizacion de este
        const {old_telefono_contacto,telefono_contacto} = req.body

        //Actualizamos el registro del usuario cambiando el telefono de contacto al enviado en la consulta, donde el telefono corresponda al anterior
        await UsuarioModel.update({telefono_contacto},{where:{telefono_contacto:old_telefono_contacto}})

        //Consultamos el usuario donde el telefono sea igual al enviado en la consulta (el registro recien actualizado)
        //Incluyendo el codigo de descuento
        const usuario = await UsuarioModel.findOne({where:{telefono_contacto},include:{model:CodigoDescuentoModel,attributes:['desc_codigo']}})

        //Enviamos el mensaje de texto usando el metodo designado en los helpers
        //Como argumentos pasamos el telefono de contacto, la descripcion del codigo que se obtubo en la consulta del usaurio, y los nombres del usuario
        const responseSms = await sendSMSCode( telefono_contacto, usuario.codigo_descuento.desc_codigo, usuario.nombres)

        //Si llega a fallar responda con respectivo mensaje de error
        if(!responseSms.status === 201)
        throw {type:"SmsError", message:"Error al enviar el mensaje", err:responseSms.err};

        //Si todo sale correcto responda con mensaje de exito
        res.json('Número Cambiado con exito')
}

//Exportamos la funcion para que esta sea usada en el respectivo router
module.exports = {ChangeNumberUser}