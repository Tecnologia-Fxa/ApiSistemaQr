const { validateResult } = require('../helpers/validationHelper')

const { validateParam } = require('./validations')

const validationCredencial = [
    validateParam('nombre_usuario'),
    validateParam('contraseña'),
    (req,res,next)=>validateResult(req,res,next)
]

module.exports = { validationCredencial }