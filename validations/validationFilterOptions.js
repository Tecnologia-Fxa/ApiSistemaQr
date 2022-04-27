const { validateResult } = require('../helpers/validationHelper')

const { validateEquals, validateParamQuery, validateNum } = require('./validations')

const validationFilterOptions = [
    validateParamQuery('atribute'),
    validateEquals('atribute', ['nombres', 'apellidos', 'correo_electronico', 'fecha_nacimiento', 'pais_telefono_fk', 'telefono_contacto', 'lugar_registro_fk', 'ciudad_fk']),
    validateParamQuery('value'),
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

module.exports = { validationFilterOptions, validationStatusCode, validationPagination }