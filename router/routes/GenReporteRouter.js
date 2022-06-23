/* Archivo que contiene las redirecciones a los controladores, en este caso contiene la ruta para generar un reporte */

//Importamos el objeto router para realizar acciones segun la consulta(url)
const router = require("express").Router();

//Importamos el controlador de generar reporte, el cual es el metodo para generar un reporte
const genReporte = require("../../controller/GenReporteController");

//Importamos el validador, en este caso este nos ayuda para que los campos de generar reporte sean adecuados
const { validationGenReporte } = require("../../validations/validationGenReporte");

//Cuando la ruta este vacia, va a validar que los campos sean correctos y despues va a ejecutar el metodo de generar reporte
router.post('/', validationGenReporte, genReporte)

//Exportamos el router
module.exports =  router