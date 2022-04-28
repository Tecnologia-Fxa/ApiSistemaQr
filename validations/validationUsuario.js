const { validateResult } = require('../helpers/validationHelper')

const { validateParam, validateName, validateLength, validateEmail, validateDate, validateParamQuery, validatePhone } = require('./validations')

const validationUsuario = [
    validateParam('nombres'),
    validateName('nombres'),
    validateLength('nombres', {min:2, max:30}),
    validateParam('apellidos'),
    validateName('apellidos'),
    validateLength('apellidos', {min:2, max:30}),
    validateParam('correo_electronico'),
    validateEmail('correo_electronico'),
    validateLength('correo_electronico', {min:6, max:75}),
    validateParam('fecha_nacimiento'),
    validateParam('telefono_contacto'),
    validatePhone('telefono_contacto'),
    validateLength('telefono_contacto', {min:4, max:30}),
    validateParam('numero_doc'),
    validateLength('numero_doc', {min:4, max:25}),
    validateParam('lugar_registro_fk'),
    (req,res,next)=>validateResult(req,res,next)
]

const validateId = [
    validateParamQuery("id_usuario"),
    (req,res,next)=>validateResult(req,res,next)
]

const validationErrSendSms = [
    validateParam('telefono_contacto'),
    (req,res,next)=>validateResult(req,res,next)
]

module.exports = { validationUsuario, validationErrSendSms, validateId }