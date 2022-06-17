/* Validacion de el contador de vicitas en la pagina... valida que los campos que ingresan a la api sean adecuados en caracteres/sintaxis */

//Yamamos nuestro validador de los helpers
const { validateResult } = require('../helpers/validationHelper')

//Llamamos las funciones de validación para ahorrarnos codigo de mas
const { validateParamQuery, validateLength } = require('./validations')

//Creamos un arreglo el cual va a realizar las validaciones
const validationNamePage = [
    //Validamos que exista el caracter "page"
    validateParamQuery('page'),
    //Validamos que el caracter "page" tenga un minimo de 4 caracteres y un maximo de 50
    validateLength('page', {min:4, max:50}),
    //Metodo que se usa para validar las funciones anteriores y dar una respuesta en dado caso que falle
    (req,res,next)=>validateResult(req,res,next)
]

//Exportamos el modulo para usarlo en otra seccion del codigo
module.exports = { validationNamePage }