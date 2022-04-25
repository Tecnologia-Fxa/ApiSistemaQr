const router = require("express").Router();

const genReporte = require("../../controller/GenReporteController");
const { validationGenReporte } = require("../../validations/validationGenReporte");

router.post('/', validationGenReporte, genReporte)

module.exports =  router