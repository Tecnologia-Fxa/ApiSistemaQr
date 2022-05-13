const { validateResult } = require('../helpers/validationHelper')

const { validateParamQuery, validateLength } = require('./validations')

const validationNamePage = [
    validateParamQuery('page'),
    validateLength('page', {min:4, max:50}),
    (req,res,next)=>validateResult(req,res,next)
]

module.exports = { validationNamePage }