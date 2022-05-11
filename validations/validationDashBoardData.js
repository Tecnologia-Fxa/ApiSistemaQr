const { validateResult } = require('../helpers/validationHelper')

const { validateParamQuery } = require('./validations')

const validationGetMensualData = [
    validateParamQuery('fecha_inicio'),
    validateParamQuery('fecha_fin'),
    (req,res,next)=>validateResult(req,res,next)
]

module.exports = { validationGetMensualData }