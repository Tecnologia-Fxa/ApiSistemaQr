/* Archivo que contiene las funciones correspondientes a la validaciond e data relacionada con opciones de filtro al consultar algun usuario */

//Llamamos el metodo validador
const { validateResult } = require('../helpers/validationHelper')

//Llamamos los metodos de validacion que requerimos usar en las funciones del archivo
const { validateEquals, validateParamQuery, validateNum } = require('./validations')

//Funcion que sirve para validar si el atributo de filtro corresponde a un valor logico
const validationFilterOptions = [
    //Valida que exista un campo denominado "atribute"
    validateParamQuery('atribute'),
    //Valida que el campo anterior sea igual a uno de los siguientes requerimientos
    validateEquals('atribute', ['nombres', 'apellidos', 'correo_electronico', 'fecha_nacimiento', 'telefono_contacto', 'numero_doc', 'lugar_registro_fk']),
    //Valida que exista un campo denominado "value"
    validateParamQuery('value'),
    //Usamos el metodo validador para retornar o no mensajede error segun corresponda
    (req,res,next)=>validateResult(req,res,next)
]

//Valida que las fechas en la condicion de filtros sean logicas
const validationDateOptions =[
    //Valida que exista un campo denominado "fechaInicio"
    validateParamQuery('fechaInicio'),
    //Valida que exista un campo denominado "fechaFin"
    validateParamQuery('fechaFin'),
    //Valida que exista un campo denominado "campo"
    validateParamQuery('campo'),
    //Valida que el campo sea igual a la informacion requerida
    validateEquals('campo', ['fecha_nacimiento', 'createdAt']),
    //Usamos el metodo validador para retornar o no mensajede error segun corresponda
    (req,res,next)=>validateResult(req,res,next)
]

//Metodo que valida si existen los campos de paginacion en el header
const validationPagination = [
    //Valida que sea un numero el campo "page"
    validateNum('page'),
    //Valida que sea un numero el campo "size"
    validateNum('size'),
    //Usamos el metodo validador para retornar o no mensajede error segun corresponda
    (req,res,next)=>validateResult(req,res,next)
]

//Valida que el campo estado code exista y tenga un valor determinado
const validationStatusCode = [
    //Valida que exista un campo denominado "estado_code"
    validateParamQuery('estado_code'),
    //Valida que este campo sea 1 = activo o 0 = inactivo
    validateEquals('estado_code', ['1','0']),
    //Usamos el metodo validador para retornar o no mensajede error segun corresponda
    (req,res,next)=>validateResult(req,res,next)
]

//Exportamos las funciones para usarlas en otro espacio del proyecto
module.exports = { validationFilterOptions, validationStatusCode, validationPagination, validationDateOptions }