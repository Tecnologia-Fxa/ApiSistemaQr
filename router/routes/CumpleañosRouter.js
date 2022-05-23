const CumpleañosController = require("../../controller/CumpleañosController");

const router = require("express").Router();

router.get('/get-by-day', CumpleañosController.getByDay)

router.get('/get-by-month', CumpleañosController.getByMonth)

router.get('/get-by-range', CumpleañosController.getByRange)

router.get('/get-range-filter-age', CumpleañosController.getByRangeFilterByAge)

router.post('/get-range-filter-lugar', CumpleañosController.getByRangeFilterByLugar)

module.exports =  router