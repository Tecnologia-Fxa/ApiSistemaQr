/* Este archivo contiene las redirecciones a los controladores, en este caso de codigo de descuento */

//Se define el objeto router de express el cual permite el analicis de las rutas y definicion de metodos segun la consulta
const router = require("express").Router();

//Se importa el metodo del controlador ChangeStatusCode de cambiar el estado delcodigo
const { ChangeStatusCode } = require("../../controller/ChangeStatusCode");

//Se importa la validacion del token de acceso por parte del servidor
const checkTokenServer = require("../../helpers/validationServer");

//Se importa la validacion basica de codigo
const { validationCode } = require("../../validations/validationCode");

//Cuando la ruta sea "/cod-validate" se valida que el que esta tratando de cambiar el estado del codigo tenga el token de acceso, se valida la estructura basica del codigo, se ejecuta el metodo ChangeStatusCode
//Esta ruta cambia el estado de un codigo de sin 0 = canjear a 1 = canjeado
router.post('/cod-validate', checkTokenServer, validationCode, ChangeStatusCode)

//Exportamos el router
module.exports =  router