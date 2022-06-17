/* Metodo encargado de validar que la información obtenida atravez de la seccion de usuarios tenga almenos un minimo de requicitos en su contenido*/

//Importamos el helper de validateResult que se usa para validar que no haya fallado ninguno de los validadores
const { validateResult } = require('../helpers/validationHelper')

//Importamos todos nuestros metodos validadores que se usaran en la funcion
const { validateParam, validateName, validateLength, validateEmail, validateDate, validateParamQuery, validatePhone } = require('./validations')

//Funcion que validara uno a uno los campos y retornara mensajes de error segun fallen
const validationUsuario = [
    //Valida que exista un campo denominado "nombre" en el cuerpo de la solicitud
    validateParam('nombres'),
    //Valida que este campo "nombre" no tenga numeros o caracteres especiales
    validateName('nombres'),
    //Valida que el nombre tenga minimo 2 caracteres y maximo 30
    validateLength('nombres', {min:2, max:30}),
    //Valida que exista un campo denominado apellidos eb el cuerpo de la solicitud
    validateParam('apellidos'),
    //Valida que los apellidos no tengan numeros ni caracteres especiales
    validateName('apellidos'),
    //Valida que el campo de apellidos tenda minimo 2 caracteres y maximo 30 caracteres
    validateLength('apellidos', {min:2, max:30}),
    //Valida que exista un campo denominado "correo_electronico" en el cuerpo de la solicitud
    validateParam('correo_electronico'),
    //Valida que el correo electronico cumpla las minimas condiciones de un email
    validateEmail('correo_electronico'),
    //Valida que el correo electronico tenga minimo 6 caracteres y maximo 75
    validateLength('correo_electronico', {min:6, max:75}),
    //Valida que exista un campo denominado fecha naciminento
    validateParam('fecha_nacimiento'),
    //Valida que exista un campo denominado "telefono_contacto"
    validateParam('telefono_contacto'),
    //Valida que este telefono de contacto minimo tenga 4 caracteres y maximo 30 caracteres
    validateLength('telefono_contacto', {min:4, max:30}),
    //Valida que exista un campo denominado "numero_doc"
    validateParam('numero_doc'),
    //Valida que este campo tenga minimo 4 caracteres y maximo 25 caracteres
    validateLength('numero_doc', {min:4, max:25}),
    //Valida que exista un campo denominado "lugar_registro_fk"
    validateParam('lugar_registro_fk'),
    //Valida que las condiciones anteriores se cumpla sino arroja error
    (req,res,next)=>validateResult(req,res,next)
    //!En dado caso que falle alguna de las condiciones anteriores el api arrojara estado 400 y un mensaje de error en cada uno de los validadores que fallo
]

//Metodo que valida que si se haya enviado un id en el header de la consulta
const validateId = [
    //Valida que exista un campo denominado "id_usuario" en el encabezado de la consulta
    validateParamQuery("id_usuario"),
    //Valida que las condiciones anteriores se cumpla sino arroja error
    (req,res,next)=>validateResult(req,res,next)
]

//Valida que se envie en el cuerpo de la solicitud el numero de telefono para que se pueda reenviar el mensaje de texto
const validationErrSendSms = [
    validateParam('telefono_contacto'),
    (req,res,next)=>validateResult(req,res,next)
]

//Exportamos las funciones para poder usarlas en otra parte del codigo
module.exports = { validationUsuario, validationErrSendSms, validateId }