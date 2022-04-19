const { validateResult } = require('../helpers/validationHelper')

const { validateParam, validateName, validateLength, validateEmail, validateDate } = require('./validations')

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
    validateDate('fecha_nacimiento'),
    validateParam('pais_telefono_fk'),
    validateParam('telefono_contacto'),
    validateLength('telefono_contacto', {min:4, max:20}),
    validateParam('lugar_registro_fk'),
    validateParam('ciudad_fk'),
    (req,res,next)=>validateResult(req,res,next)
]

module.exports = { validationUsuario }