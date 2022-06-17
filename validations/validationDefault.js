/* Archivo que contiene la validacion de id en los encabezados */

//Importamos el metodo validador
const { validateResult } = require("../helpers/validationHelper")

//Importamos la unica funcion validadora que usaremos en este fragmento de codigo
const { validateParamQuery } = require("./validations")

//Funcion que se utiliza para validar que exista un id en la consulta
const validationIdDefault = [
    //Valida si existe en la consulta un campo denominado "id"
    validateParamQuery('id'),
    //Usamos el metodo validador que responde con un determinado mensaje en dado caso que falle las condiciones sino sigue con el siuiente metodo en la lista
    (req,res,next)=>validateResult(req,res,next)
]

//Exportamos la funcion para que sea usada en otro fragmento del codigo
module.exports = { validationIdDefault }