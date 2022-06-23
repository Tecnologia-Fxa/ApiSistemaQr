/* El siguiente archivo contiene las redirecciones al controlador, en este caso al controlador de credenciales para el acceso y uso del sistema */

//Se importa el objeto router de express para poder analizar las consultas y ejecutar una determinada accion segun corresponda
const router = require("express").Router();

//Se importa el controlador de credencial donde estan todos los metodos que se van a usar
const CredencialController = require("../../controller/CredencialController");

//Se importa el validador de token de login para validar si el usuario accedio o no en el sistema
const checkTokenLogin = require("../../helpers/validacionLogin");

//Se importa el validador de admin, el cual sirve para validar si el usuario que ejecuta una determinada accion es un administrador del sistema
const { checkAdmin } = require("../../helpers/validationUser");

//Se importan los metodos validadores de informacion, para que toda la informacion que ingresa en el api sea logica
const { validationCredencial, validationChangePass } = require("../../validations/validationCredencial");

//Cuando la ruta sea "/login" va a validar que se haya ingresado algun campo, despues ejecuta el metodo logIn del controlador de credencial
//Esta ruta validara un usuario y contraseña, y si estos coinciden con los almacenados en el sistema retornara un token de acceso
router.post('/login', validationCredencial, CredencialController.logIn)

//Cuando la ruta sea "/create-credentials" va a ejecutar el metodo createCredencials del controlador de credencial
//Esta ruta creara las credenciales de acceso por defecto, esto en dado caso que se borren de la base de datos
router.get('/create-credentials', CredencialController.createCredencials)

//Cuando la ruta sea "/change-pass", validara el acceso al sistema, despues validara que sea el admin el que realiza la consulta, despues valida que los campos correspondan a una logica base, para despues ejecutar el metodo changePassCredential del controlador de crendencial
//Esta ruta cambiara la contraseña de un rol en especifico
router.put('/change-pass', checkTokenLogin, checkAdmin, validationChangePass, CredencialController.changePassCredential)

//Exportamos el router
module.exports =  router