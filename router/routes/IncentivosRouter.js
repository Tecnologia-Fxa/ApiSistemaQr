
const router = require("express").Router();

const IncentivosController = require("../../controller/IncentivosController");
const { validationIncentivo, validationIdIncentivo } = require("../../validations/validationIncentivo");


router.post('/create', validationIncentivo, IncentivosController.create)

router.put('/update', validationIncentivo, validationIdIncentivo, IncentivosController.update)

router.delete('/delete', validationIdIncentivo, IncentivosController.delete)

router.get('/get-all', IncentivosController.obtenerEstadoIncentivos)

module.exports =  router