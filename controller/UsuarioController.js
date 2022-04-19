const { validationResult } = require("express-validator")
const UsuarioModel = require("../database/models/UsuarioModel")
const CodigoDescuentoModel = require("../database/models/CodigoDescuentoModel");
const {randomBytes} = require("crypto");

const UsuarioController = {

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

        let id_usuario = await UsuarioModel.count()
        id_usuario++
        UsuarioModel.create({
            id_usuario,
            nombres, 
            apellidos, 
            correo_electronico, 
            fecha_nacimiento,
            pais_telefono_fk, 
            telefono_contacto, 
            lugar_registro_fk,
            ciudad_fk
        }).then(async(response)=>{

            let desc_codigo = randomBytes(Math.ceil(5 / 2)).toString('hex').slice(0, 5);
        
            let id_codigo_descuento = await CodigoDescuentoModel.count()
            id_codigo_descuento++

            CodigoDescuentoModel.create({
                id_codigo_descuento,
                desc_codigo,
                usuario_fk:response.id_usuario
            }).then(codeResponse=>{
                res.json({codeResponse})
            }).catch(err=>{
                res.json(err.message)
            })


        }).catch(err=>{
            res.json({error:err.message})
        })

    }

}

module.exports = UsuarioController