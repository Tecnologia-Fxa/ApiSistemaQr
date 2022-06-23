/* Archivo que contiene el metodo que cambia de estado un codigo al momento de este ser canjeado por el usuario */

//Importamos el metodo validador de express-validator
const { validationResult } = require("express-validator")

//Importamos el modelo de codigo de descuento
const CodigoDescuentoModel = require("../database/models/CodigoDescuentoModel")

//Definimos el metodo que sera el que permite realizar el cambio del estado del codigo en la base de datos
const ChangeStatusCode = async(req,res)=>{
    //Obtenemos del cuerpo de la solicitud el codigo que fue validado
    const { codigoValidado } = req.body

    //Validamos que el codigo cumpla con los parametros definidos en las funciones anteriores
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array() })
    }

    //Realizamos el cambio de estado a activo(1) donde la descripcion del codigo corresponda a la enviada en la consulta
    await CodigoDescuentoModel.update({estado:1},{where:{desc_codigo:codigoValidado}})

    //Respondemos con estado 201 y mensaje de actualizacion exitosa
    res.status(201).json("Codigo Actualizado con exito")
}

//Exportamos el metodo para hacer uso de este en el respectivo router
module.exports = {ChangeStatusCode}