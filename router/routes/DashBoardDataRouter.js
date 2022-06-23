/* Archivo que contiene las redirecciones a los controladores, en este caso de la informacion que sera mostrada en el dashBard de la pagina */

//Importamos el objeto router de express el cual sirve para analizar la ruta y segun ejecutar unas determinadas funciones
const router = require("express").Router();

//Importamos el controlador del dashboard, el cual tiene todos los metodos que seran llamados
const { DashBoardDataController } = require("../../controller/DashBoardDataController");

//Importamos el validador de informacion del dashboard, para que toda la informacion que entre tenga algo de logica
const { validationGetMensualData } = require("../../validations/validationDashBoardData");

//Cuando la ruta sea "/get-data-cards" va a ejecutar el metodo getDataCartas del controlador de dashboard
//Esta ruta de consulta traera la informacion basica que se muestra en las cartas de las eccion del dashboard
router.get('/get-data-cards', DashBoardDataController.getDataCartas)

//Cuando la ruta sea "/get-data-count-lugar-registro" va a ejecutar la validaciond e informacion y despues ejecutara el metodo getDataConteoMensualLugarRegistro del controlador del dashboard
//Esta ruta de consulta traera la informacion de contar cuantos registros hay por mes segun el lugar requerido
router.get('/get-data-count-lugar-registro', validationGetMensualData, DashBoardDataController.getDataConteoMensualLugarRegistro)

//Cuando la ruta sea "/get-data-age" va a ejecutar el metodo de getDataAge del controlador dashboard 
//Esta ruta de consulta traera un conteo de las personas segun su edad
router.get('/get-data-age', DashBoardDataController.getDataAge)

//Exportamos el router
module.exports =  router