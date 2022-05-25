const CodigoDescuentoModel = require("../database/models/CodigoDescuentoModel")
const UsuarioModel = require("../database/models/UsuarioModel")
const { sendSMSCode } = require("../helpers/sendSms")

const ChangeNumberUser = async(req,res)=>{
        const {old_telefono_contacto,telefono_contacto} = req.body
        await UsuarioModel.update({telefono_contacto},{where:{telefono_contacto:old_telefono_contacto}})

        const usuario = await UsuarioModel.findOne({where:{telefono_contacto},include:{model:CodigoDescuentoModel,attributes:['desc_codigo']}})

        const responseSms = await sendSMSCode( telefono_contacto, usuario.codigo_descuento.desc_codigo, usuario.nombres)
        if(!responseSms.status === 201)
        throw {type:"SmsError", message:"Error al enviar el mensaje", err:responseSms.err};

        res.json('Número Cambiado con exito')
}

module.exports = {ChangeNumberUser}