/* Archivo con la funcion que valida si el codigo recivido por el servidor es valido */

//importamos el metodo validador
const { validateResult } = require('../helpers/validationHelper')

//Importamos las funciones de validacion requeridas en el archivo
const { validateParam, validateLength } = require('./validations')

//Funcion que valida si entro un codigo y si tiene el tamaño adecuado
const validationCode = [
    //Valida que exista un campo denominado "codigoValidado"
    validateParam('codigoValidado'),
    //valida que este campo se encuentre entre 4 y 18 caracteres
    validateLength('codigoValidado', {min:4, max:18}),
    //Usamos el metodo validador para retornar debido mensaje de error si alguna de las funciones anteriores falla
    (req,res,next)=>validateResult(req,res,next)
]

//Exportamos la funcion para que esta sea usada en otra seccion del codigo del proyecto
module.exports = { validationCode }