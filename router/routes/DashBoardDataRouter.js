const router = require("express").Router();

const { DashBoardDataController } = require("../../controller/DashBoardDataController");

router.get('/get-data-cards', DashBoardDataController.getDataCartas)

module.exports =  router