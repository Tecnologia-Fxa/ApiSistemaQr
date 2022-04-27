const { validateResult } = require("../helpers/validationHelper")
const { validateParamQuery } = require("./validations")

const validationIdDefault = [
    validateParamQuery('id'),
    (req,res,next)=>validateResult(req,res,next)
]

module.exports = { validationIdDefault }