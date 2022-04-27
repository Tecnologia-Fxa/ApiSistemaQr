const { validateResult } = require('../helpers/validationHelper')

const { validateParam, validateEquals } = require('./validations')

const validationCredencial = [
    validateParam('nombre_usuario'),
    validateParam('contraseña'),
    (req,res,next)=>validateResult(req,res,next)
]

const validationChangePass =[
    validateParam('contraseña'),
    validateParam('nombre_usuario'),
    validateEquals('nombre_usuario',['Admin', 'Analista', 'Tecnologia']),
    validateParam('nueva_contraseña'),
    (req,res,next)=>validateResult(req,res,next)
]

module.exports = { validationCredencial, validationChangePass }