/* Metodo encargado de validar que la información obtenida atravez de la seccion de usuarios tenga almenos un minimo de requicitos en su contenido*/

const { validateResult } = require('../helpers/validationHelper')

const { validateParam, validateNum, validateParamQuery } = require('./validations')

const validationIncentivo = [
    validateParam('meta_incentivo'),
    validateNum('meta_incentivo'),
    validateParam('fecha_inicio'),
    validateParam('fecha_corte'),
    validateParam('lugar_registro_fk'),
    (req,res,next)=>validateResult(req,res,next)
]

const validationIdIncentivo = [
    validateParamQuery('id_incentivo'),
    validateNum('id_incentivo'),
    (req,res,next)=>validateResult(req,res,next)
]

module.exports = { validationIncentivo, validationIdIncentivo }