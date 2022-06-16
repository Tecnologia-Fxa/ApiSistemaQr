const CampañaController = require("../../controller/CampañaController");

const router = require("express").Router();

router.post('/new', CampañaController.new)

module.exports =  router