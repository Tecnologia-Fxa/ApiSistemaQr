/* Archivo que contiene las redirecciones al controlador, en este caso redireccionara al controlador de cumpleaños */

//Importamos el controlador de cumpleaños 
const CumpleañosController = require("../../controller/CumpleañosController");

//Importamos el objeto router el cual nos permite analizar las consultas realizadas en el api
const router = require("express").Router();

//Cuando la ruta sea "/get-by-day" va a ejecutar el metodo de getByDay del controlador de cumpleaños
//Este metodo retorna todas las personas que cumplen años en un día en especifico
router.get('/get-by-day', CumpleañosController.getByDay)

//Cuando la ruta sea "/get-by-month" va a ejecutar el metodo getByMonth del controlador de cumpleaños
//Esta ruta traera todas las personas que cumplen años en un determinado mes
router.get('/get-by-month', CumpleañosController.getByMonth)

//Cuando la ruta sea "/get-by-range" va a ejecutar el metodo getByRange del controlador de cumpleaños
//Esta ruta traera las personas que cumplen años
router.get('/get-by-range', CumpleañosController.getByRange)

//Cuando la ruta sea "/get-range-filter-age" se va a ejecutar el metodo getByRangeFilterByAge del controlador de cumpleaños
//Esta ruta traera una consulta por rango de fecha pero filtrando las edades en un orden en especifico
router.get('/get-range-filter-age', CumpleañosController.getByRangeFilterByAge)

//Cuando la ruta sea "/get-range-filter-age" se va a ejecutar el metodo getByRangeFilterByLugar del controlador de cumpleaños
//Esta ruta traera una consulta por rango de fecha pero filtrando segun el lugar de registro
router.post('/get-range-filter-lugar', CumpleañosController.getByRangeFilterByLugar)

//Cuando la ruta sea "/get-range-filter-age" se va a ejecutar el metodo getByRangeChangeOrder del controlador de cumpleaños
//Esta ruta traera una consulta por rango de fecha pero organizando en un orden especifico
router.get('/get-range-change-order', CumpleañosController.getByRangeChangeOrder)

//Se exporta el router
module.exports =  router