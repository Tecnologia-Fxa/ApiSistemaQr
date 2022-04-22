const { validationResult } = require("express-validator")
const CodigoDescuentoModel = require("../database/models/CodigoDescuentoModel")


const ChangeStatusCode = async(req,res)=>{
    const { codigoValidado } = req.body

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array() })
    }

    await CodigoDescuentoModel.update({estado:1},{where:{desc_codigo:codigoValidado}})

    res.status(201).json("Codigo Actualizado con exito")
}

module.exports = {ChangeStatusCode}