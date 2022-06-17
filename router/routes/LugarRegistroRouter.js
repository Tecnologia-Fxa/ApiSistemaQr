/* Archivo que contiene las redirecciones a los controladores, en este caso del modulo de lugares de registro/almacenes */

//importamos el router de express
const router = require("express").Router();

//Importamos el controlador de lugar de registro
const LugarRegistroController = require("../../controller/LugarRegistroController");

//Importamos el helper que valida si se accedio al sistema
const checkTokenLogin = require("../../helpers/validacionLogin");

//Importamos el metodo que valida si el usuario registrado tiene rol de admin
const { checkAdmin } = require("../../helpers/validationUser");

//Importamos los metodos validadores de informacion en este caso el metodo de creacion y de validacion de id
const { validationCreate, validateId } = require("../../validations/validationLugarRegistro");

//Cuando la ruta este vacia, validara que el usuario haya accedido al api y despues ejecutara el metodo getAll del controlador de lugar de registro
//este metodo trae todos los lugares de registro que se encuentran en el sistema
router.get('/', checkTokenLogin, LugarRegistroController.getAll)

//Cuando la ruta sea "/state-true", ejecutara el metodo getAllActive del controlador de lugares de registro
//Este metodo trae los lugares de registro que se encuentren activos
router.get('/state-true', LugarRegistroController.getAllActive)

//Cuando la ruta sea "/find" validara el acceso al api, despues validara que llegue un id en la consulta y despues ejecutara el metodo getOne del controlador de lugar de registro
//Este metodo traera un lugar de registro segun el id indicado
router.get('/find', checkTokenLogin, validateId, LugarRegistroController.getOne)

//Cuando la ruta sea "/create" validara el login en el api, validara que el rol que ejecuta la funcion sea admin, y validara que los campos coincidan a lo requerido, despues ejecutara el metodo create del controlador lugar de registro
//Esta ruta crea un nuevo lugar de registro que sera mostrado en el formulario
router.post('/create',  checkTokenLogin, checkAdmin, validationCreate, LugarRegistroController.create)

//Cuando la ruta sea "/update" validara el login en el api, validara que el rol que ejecuta la funcion sea admin, y validara que los campos coincidan a lo requerido, despues ejecutara el metodo update del controlador lugar de registro
router.put('/update',  checkTokenLogin, checkAdmin, validationCreate, validateId, LugarRegistroController.update)

router.put('/disable',  checkTokenLogin, checkAdmin, validateId, LugarRegistroController.disable)

router.put('/enable',  checkTokenLogin, checkAdmin, validateId, LugarRegistroController.enable)

module.exports =  router