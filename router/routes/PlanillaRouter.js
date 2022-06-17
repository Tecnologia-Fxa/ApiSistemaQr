/* Archivo que contiene las redirecciones al controlador, pero en este caso del modulo plantilla */

//Importamos el controlador de plantilla
const PlantillaController = require("../../controller/PlantillaController");

//importamos el router de exppress para analizar la consulta
const router = require("express").Router();

//Cuando la consulta venga vacia, ejecutara el metodo de getAll
//Este metodo tarera todos los registros de plantilla
router.get('/', PlantillaController.getAll)

//Cuando la ruta sea "/" ejecutara el metodo getOne del controlador de plantilla
//Este metodo traera un solo registro de plantilla segun el id
router.get('/get', PlantillaController.getOne)

//Cuando la ruta sea "/create" ejecutara el metodo create del controlador plantilla
//Este metodo creara una nueva plantilla
router.post('/create', PlantillaController.create)

//Cuando la ruta sea "/update" ejecutara el metodo update del controlador plantilla
//Este metodo actualizara un registro de plantilla segun el id enviado
router.put('/update', PlantillaController.update)

//Metodo de prueba fase 2
router.post('/prueba', PlantillaController.prueba)

//expostamos el router
module.exports =  router