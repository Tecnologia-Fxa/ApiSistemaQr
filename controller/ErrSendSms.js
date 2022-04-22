const { default: axios } = require("axios")
const { randomBytes } = require("crypto")
const CodigoDescuentoModel = require("../database/models/CodigoDescuentoModel")
const PaisModel = require("../database/models/PaisModel")
const UsuarioModel = require("../database/models/UsuarioModel")
const { sendSMSCode } = require("../helpers/sendSms")

const newCode = async(usuario) =>{

    let code = randomBytes(Math.ceil(6 / 2)).toString('hex').slice(0, 6);
    let result = await CodigoDescuentoModel.findAll({where:{desc_codigo:code}})
    while (result[0]) {
        code = randomBytes(Math.ceil(6 / 2)).toString('hex').slice(0, 6);
        result = await CodigoDescuentoModel.findAll({where:{desc_codigo:code}})
    }
    
    return code
}

//Importamos nuestro documento de variables de entorno
//Para esto usamos una libreria que nos facilita el trabajo llamada dotenv
//El archivo donde se encuentran las variables de entorno es ".env"
require ('dotenv').config();

const URLSENDCODE = process.env.URLCODE
const sendCode = async(code)=>{
    return axios.post(URLSENDCODE, {codigo:code}).then(res=>res.data)
}

const ErrSendSms = async(req,res)=>{
    const { telefono_contacto } = req.body

    const usuario = await UsuarioModel.findOne({
        where:{telefono_contacto},
        attributes:['id_usuario', 'nombres', 'pais_telefono_fk', 'telefono_contacto'],
        include:{
            model:CodigoDescuentoModel,
            attributes:['id_codigo_descuento', 'desc_codigo', 'estado']
        } 
    })


    //------------ Consulta El Codigo Telefonico Del Pais

    let dataPais = await PaisModel.findOne({where:{id_pais:usuario.pais_telefono_fk}})

    try {

        if(usuario.codigo_descuento){
            
            if(!usuario.codigo_descuento.estado){
                //------------- Enviar Mensaje De Texto
                if(usuario.telefono_contacto === '3132286510' || usuario.telefono_contacto === '3209897269'){
                    const responseSms = await sendSMSCode( telefono_contacto, dataPais.codigo_telefonico, usuario.codigo_descuento.desc_codigo, usuario.nombres)
                    if(!responseSms.status ===201)
                        throw {type:"SmsError", message:"Error al enviar el mensaje", err:responseSms.err};
                    res.json("Codigo Reenviado")
                }
            }else{
                res.json("Codigo ya sido conjeado")
            }

        }else{

            const codigoDescuentoCreado = await CodigoDescuentoModel.create({
                desc_codigo: await newCode(usuario),
                usuario_fk:usuario.id_usuario
            })
            //-------Enviar Codigo a Eureka
            const msgSendCode = await sendCode(codigoDescuentoCreado.desc_codigo)
                
            if(!msgSendCode.codigo)
                throw {type:"ServerError", message:"Error en el servidor"};

            //------------- Enviar Mensaje De Texto

            if(usuario.telefono_contacto === '3132286510' || usuario.telefono_contacto === '3209897269'){
                const responseSms = await sendSMSCode( telefono_contacto, dataPais.codigo_telefonico, msgSendCode.codigo, usuario.nombres)
                if(!responseSms.status ===201)
                    throw {type:"SmsError", message:"Error al enviar el mensaje", err:responseSms.err};

            }

            //------------- Respuesta de La Api

            res.json({message:"Creado"})
        }

    }catch (error) {
        if (error.type ==="ServerError" || error.type ==="SmsError" || error.code==="ECONNREFUSED" || error.code==="ER_DUP_ENTRY"){
            await UsuarioModel.destroy({where:{id_usuario:usuarioCreado.id_usuario}})
            res.json({error:error.message})
        }else
            res.json({error:error.message}) 
    }

}

module.exports = {ErrSendSms}