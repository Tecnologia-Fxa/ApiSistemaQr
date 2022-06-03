const PlantillaController = require("../../controller/PlantillaController");

const router = require("express").Router();

router.get('/', PlantillaController.getAll)

router.get('/get', PlantillaController.getOne)

router.post('/create', PlantillaController.create)

router.put('/update', PlantillaController.update)

router.post('/prueba', PlantillaController.prueba)

module.exports =  router