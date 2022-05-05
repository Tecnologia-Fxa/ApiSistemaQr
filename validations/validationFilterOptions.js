const { validateResult } = require('../helpers/validationHelper')

const { validateEquals, validateParamQuery, validateNum } = require('./validations')

const validationFilterOptions = [
    validateParamQuery('atribute'),
    validateEquals('atribute', ['nombres', 'apellidos', 'correo_electronico', 'fecha_nacimiento', 'telefono_contacto', 'numero_doc', 'lugar_registro_fk']),
    validateParamQuery('value'),
    (req,res,next)=>validateResult(req,res,next)
]

const validationDateOptions =[
    validateParamQuery('fechaInicio'),
    validateParamQuery('fechaFin'),
    validateParamQuery('campo'),
    validateEquals('campo', ['fecha_nacimiento', 'createdAt']),
    (req,res,next)=>validateResult(req,res,next)
]

const validationPagination = [
    validateNum('page'),
    validateNum('size'),
    (req,res,next)=>validateResult(req,res,next)
]

const validationStatusCode = [
    validateParamQuery('estado_code'),
    validateEquals('estado_code', ['1','0']),
    (req,res,next)=>validateResult(req,res,next)
]

module.exports = { validationFilterOptions, validationStatusCode, validationPagination, validationDateOptions }