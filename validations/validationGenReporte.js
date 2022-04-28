const { validateResult } = require('../helpers/validationHelper')

const { validateExist, validateArray, validateEquals, validateParam, validateNum } = require('./validations')

const validationGenReporte = [
    validateExist('campos'),
    validateArray('campos'),
    validateEquals('campos.*.campo',['nombres','apellidos','correo_electronico','fecha_nacimiento','telefono_contacto','numero_doc','createdAt']),
    validateExist('foraneas'),
    validateArray('foraneas'),
    validateEquals('foraneas.*.campo',['lugar_registro', 'estado_codigo']),
    validateExist('condiciones'),
    validateArray('condiciones'),
    validateEquals('condiciones.*.campo',['nombres','apellidos','correo_electronico','fecha_nacimiento','telefono_contacto','numero_doc','createdAt']),
    validateParam('condiciones.*.valor'),
    validateEquals('condiciones.*.tipo',[1,4]),
    validateExist('condiciones_num'),
    validateArray('condiciones_num'),
    validateEquals('condiciones_num.*.campo',['lugar_registro', 'estado_codigo']),
    validateParam('condiciones_num.*.valor'),
    validateNum('condiciones_num.*.valor'),
    validateEquals('condiciones_num.*.tipo',[2,3]),
    (req,res,next)=>validateResult(req,res,next)
]

module.exports = { validationGenReporte }