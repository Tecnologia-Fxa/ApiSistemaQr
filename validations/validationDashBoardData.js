/* archivo que valida que exista alguna informacion para realizar la compracion de fechas */

//importamos el metodo validador 
const { validateResult } = require('../helpers/validationHelper')

//Importamos el metodo que nos ayuda a saber si hay un campo registrado en la consulta
const { validateParamQuery } = require('./validations')

//funcion que valida que la informacion en la obtencion de data mensual es valida
const validationGetMensualData = [
    //Se valida si existe un campo denominado "fecha_inicio"
    validateParamQuery('fecha_inicio'),
    //Se valida si existe un campo denominado "fecha_fin"
    validateParamQuery('fecha_fin'),
    //Se hace uso del metodo validador para que en dado caso que falle alguna condicion este lo indique
    (req,res,next)=>validateResult(req,res,next)
]

//Exportamos la funcion declarada
module.exports = { validationGetMensualData }