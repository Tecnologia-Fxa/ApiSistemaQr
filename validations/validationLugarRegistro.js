/* Archivo que contiene las funciones de validacion de data que entra en el api referente al lugar de registro */

//Integramos nuestro metodo validador
const { validateResult } = require('../helpers/validationHelper')

//Importamos las funciones que nos permiten validar los campos de manera personalizada
const { validateParam, validateLength, validateParamQuery } = require('./validations')

//Funcion que valida los datos que entran al momento de crear/actualizar un almacen
const validationCreate = [
    //Valida que exista un campo denominado "nombre_lugar_registro"
    validateParam('nombre_lugar_registro'),
    //Valida que el campo tenga minimo 4 caracteres y maximo 35
    validateLength('nombre_lugar_registro', {min:4, max:35}),
    //Integramos nuestro metodo validador que verifica si fallo o no alguna de las funciones anteriores y retorna mensaje segun corresponda
    (req,res,next)=>validateResult(req,res,next)
]

//Funcion que valida si existe un id en el encabezado de la pagina
const validateId = [
    //Valida si existe en el encabezado de la solicitud un campo denominado "id_lugar_registro"
    validateParamQuery('id_lugar_registro'),
    //Integramos nuestro metodo validador que verifica si fallo o no alguna de las funciones anteriores y retorna mensaje segun corresponda
    (req,res,next)=>validateResult(req,res,next)
]

//Exportamos nuestras funciones para usarlas en otra parte del codigo
module.exports = { validationCreate, validateId }