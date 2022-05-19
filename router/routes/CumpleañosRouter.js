const CumpleañosController = require("../../controller/CumpleañosController");

const router = require("express").Router();

router.get('/get-by-day', CumpleañosController.getByDay)

router.get('/get-by-month', CumpleañosController.getByMonth)

router.get('/get-by-range', CumpleañosController.getByRange)

module.exports =  router