const router = require("express").Router();

const DataPaisEstadoCiudadController = require("../../controller/DataPaisEstadoCiudadController");

router.get('/data-ciudad-estado-pais', DataPaisEstadoCiudadController.getAllData)


module.exports =  router