const { validationResult } = require("express-validator")
const UsuarioModel = require("../database/models/UsuarioModel")
const CodigoDescuentoModel = require("../database/models/CodigoDescuentoModel");
const {randomBytes} = require("crypto");
const { default: axios } = require("axios");
const PaisModel = require("../database/models/PaisModel");
const { sendSMSCode } = require("../helpers/sendSms");

const newCode = async() =>{
   
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

const NewUsuario = {

    regUsu:async(req,res)=>{
        const {
            nombres, 
            apellidos, 
            correo_electronico, 
            fecha_nacimiento,
            pais_telefono_fk, 
            telefono_contacto, 
            lugar_registro_fk,
            ciudad_fk
        } = req.body
        
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({ errors:errors.array() })
        }

        let usuarioCreado
        //-----------------Crear Usuario
        
        try {

            usuarioCreado = await UsuarioModel.create({
                nombres, 
                apellidos, 
                correo_electronico, 
                fecha_nacimiento,
                pais_telefono_fk, 
                telefono_contacto, 
                lugar_registro_fk,
                ciudad_fk
            })

            //---------------- Generar Codigo de Descuento
            
            const codigoDescuentoCreado = await CodigoDescuentoModel.create({
                desc_codigo: await newCode(),
                usuario_fk:usuarioCreado.id_usuario
            })

            //-------Enviar Codigo a Eureka
            const msgSendCode = await sendCode(codigoDescuentoCreado.desc_codigo)
            
            if(!msgSendCode.codigo)
                throw {type:"ServerError", message:"Error en el servidor"};

            //------------ Consulta El Codigo Telefonico Del Pais

            const dataPais = await PaisModel.findOne({where:{id_pais:usuarioCreado.pais_telefono_fk}})

            //------------- Enviar Mensaje De Texto

            if(usuarioCreado.telefono_contacto === '3132286510' || usuarioCreado.telefono_contacto === '3209897269'){
                const responseSms = await sendSMSCode( telefono_contacto, dataPais.codigo_telefonico, msgSendCode.codigo, usuarioCreado.nombres)
                if(!responseSms.status ===201)
                    throw {type:"SmsError", message:"Error al enviar el mensaje", err:responseSms.err};

            }

            //------------- Respuesta de La Api

            res.json({message:"Creado"})
            
        }catch (error) {
            if (error.type ==="ServerError" || error.type ==="SmsError" || error.code==="ECONNREFUSED" || error.code==="ER_DUP_ENTRY"){
                await UsuarioModel.destroy({where:{id_usuario:usuarioCreado.id_usuario}})
                res.json({error:error.message})
            }else
                res.json({error:error.message}) 
        }

    }

}

module.exports = NewUsuario