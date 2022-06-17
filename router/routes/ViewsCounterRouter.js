/* Archivo encargado de redireccionar segun el metodo pero en este caso en el contador de visitas */

//Importamos el controlador de visitas por pagina
const { ViewsCounterController } = require("../../controller/ViewsCounterController");

//Importamos el validador de campos, para el correcto ingreso de informacion en el api
const { validationNamePage } = require("../../validations/validationViewsCounter");

//Importamos el router de express
const router = require("express").Router();

//Cuando la ruta sea "/new-visit", va a ejecutar la validacion de campos y despues va a ejecutar el metodo newVisit que trae el controlador
//Esta funcion incrementa en 1 el número de visitas
router.get('/new-visit', validationNamePage, ViewsCounterController.newVisit)

//Cuando la ruta sea "/get-visits", va a ejecutar la validacion de campos y despues va a ejecutar el metodo getPageVisits que trae el controlador
//Esta funcion trae el total de visitas dependiendo del campo requerido
router.get('/get-visits', validationNamePage, ViewsCounterController.getPageVisits)

//Exportamos el router
module.exports =  router