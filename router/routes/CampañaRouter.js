/* Archivo que contiene las redirecciones a los controladores, en este caso al controlador de prueba de la fase 2 de crear una campaña */

//Importamos el controlador de campaña
const CampañaController = require("../../controller/CampañaController");

//importamos el objeto router de express el cual analisa la consulta y realiza unas determinadas funciones segun corresponda
const router = require("express").Router();

//Cuando la ruta sea "/new" va a ejecutar el metodo new del controlador de campaña
//Esta ruta va a crear una campaña ya sea por sms o email
router.post('/new', CampañaController.new)

router.get('/prueba', CampañaController.prueba)

//Exportamos el router
module.exports =  router