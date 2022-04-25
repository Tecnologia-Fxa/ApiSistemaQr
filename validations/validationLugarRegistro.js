const { validateResult } = require('../helpers/validationHelper')

const { validateParam, validateLength, validateParamQuery } = require('./validations')

const validationCreate = [
    validateParam('nombre_lugar_registro'),
    validateLength('nombre_lugar_registro', {min:4, max:35}),
    (req,res,next)=>validateResult(req,res,next)
]

const validateId = [
    validateParamQuery('id_lugar_registro'),
    (req,res,next)=>validateResult(req,res,next)
]

module.exports = { validationCreate, validateId }