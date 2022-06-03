const CampañaController = require("../../controller/CampañaController");

const router = require("express").Router();

router.post('/prueba', CampañaController.prueba)

module.exports =  router