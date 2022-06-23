/* Archivo que contiene las rutas que redirigen a los controladores, en este caso las rutas del formulario central */

//Importamos el objeto router de express, el cual nos permite analizar la ruta/consulta
const router = require("express").Router();

//Importamos el controlador de ErrSendSms que tiene el metodo de reenvio de mensajes
const { ErrSendSms } = require("../../controller/ErrSendSms");

//Importamos el cotrolador de ChangeNumberUser el cual tiene el metodo de cambiar de número en el formulario
const { ChangeNumberUser } = require("../../controller/ChangeNumberUser");

//Importamos el controlador NewUsuario el cual tiene el metodo de crear un nuevo usuario
const NewUsuario = require("../../controller/NewUsuario");

//Importamos las validaciones de datos de datos que son usadas en los metodos
const { validationUsuario, validationErrSendSms } = require("../../validations/validationUsuario");

//Cuando la ruta sea "/reg" va a validar la informacion enviada que sea adecuada, despues ejecutara el metodo regUsu del controlador de nuevo usuario
//Esta ruta vaa crear un nuevo usuario, va a enviarle el codigo de descuento a eureka y paso seguido va a enviarle el codigo de descuento al celular del usuario.
router.post('/reg', validationUsuario, NewUsuario.regUsu)

//Cuando la ruta sea "/err-send-sms" va a validar que ingrese en el cuerpo de la consulta la informacion de manera adecuada, y despues va a ejecutar el metodo ErrSendSms
//Esta ruta va a decencadenar la accion de reenviar el codigo al celular del usuario
router.post('/err-send-sms', validationErrSendSms, ErrSendSms)

//Cuando la ruta sea "/err-change-number" va a cambiar el número de telefono del usuario en el sistema y va a reenviar el codigo al nuevo celular del usuario
router.post('/err-change-number', ChangeNumberUser)

//Exportamos el metodo router
module.exports =  router