/* Metodo encargado de validar que la información obtenida atravez de la seccion de usuarios tenga almenos un minimo de requicitos en su contenido*/

const { validateResult } = require('../helpers/validationHelper')

const { validateParam, validateNum, validateParamQuery, validateLength, validateArray } = require('./validations')

const validationIncentivo = [
    validateParam('titulo'),
    validateLength('titulo', {min:4, max:75}),
    validateLength('descripcion', {min:1, max:300}),
    validateParam('meta_incentivo'),
    validateNum('meta_incentivo'),
    validateParam('fecha_inicio'),
    validateParam('fecha_corte'),
    validateParam('lugar_registro_fk'),
    validateParam('arreglo_lugares'),
    validateArray('arreglo_lugares'),
    validateArray('arreglo_lugares_meta_definida'),
    (req,res,next)=>validateResult(req,res,next)
]

const validationUpdateIncentivo = [
    validateParamQuery('id_incentivo'),
    validateNum('id_incentivo'),
    validateParamQuery('tipo_update'),
    validateNum('tipo_update'),
    validateParam('titulo'),
    validateLength('titulo', {min:4, max:75}),
    validateLength('descripcion', {min:1, max:300}),
    validateParam('meta_incentivo'),
    validateNum('meta_incentivo'),
    validateParam('fecha_inicio'),
    validateParam('fecha_corte'),
    validateParam('lugar_registro_fk'),
    validateArray('arreglo_lugares'),
    validateArray('arreglo_lugares_meta_definida'),
    (req,res,next)=>validateResult(req,res,next)
]

const validationDeleteIncentivo = [
    validateParamQuery('id_incentivo_general'),
    validateNum('id_incentivo_general'),
    (req,res,next)=>validateResult(req,res,next)
]

const validationDeleteIncentivoLugar = [
    validateParam('lugar_registro_fk'),
    validateNum('lugar_registro_fk'),
    validateParam('incentivo_general_fk'),
    validateNum('incentivo_general_fk'),
    (req,res,next)=>validateResult(req,res,next)
]

const validationUpdateIncentivoLugar = [
    validateParam('lugar_registro_fk'),
    validateNum('lugar_registro_fk'),
    validateParam('incentivo_general_fk'),
    validateNum('incentivo_general_fk'),
    validateParam('meta_a_cumplir'),
    validateNum('meta_a_cumplir'),
    (req,res,next)=>validateResult(req,res,next)
]

module.exports = { validationIncentivo, validationUpdateIncentivo, validationDeleteIncentivo, validationUpdateIncentivoLugar, validationDeleteIncentivoLugar }