const { validateResult } = require('../helpers/validationHelper')

const { validateParam, validateLength } = require('./validations')

const validationCode = [
    validateParam('codigoValidado'),
    validateLength('codigoValidado', {min:4, max:18}),
    (req,res,next)=>validateResult(req,res,next)
]

module.exports = { validationCode }