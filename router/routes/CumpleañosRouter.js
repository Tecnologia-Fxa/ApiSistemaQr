const CumpleañosController = require("../../controller/CumpleañosController");

const router = require("express").Router();

router.get('/get-by-day', CumpleañosController.getByDay)

router.get('/get-by-month', CumpleañosController.getByMonth)

module.exports =  router