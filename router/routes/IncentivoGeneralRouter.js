const IncentivoGeneralController = require("../../controller/IncentivoGeneralController");
const { validationIncentivo, validationUpdateIncentivo, validationDeleteIncentivo, validationUpdateIncentivoLugar, validationDeleteIncentivoLugar } = require("../../validations/validationIncentivo");

const router = require("express").Router();

router.post('/create', validationIncentivo, IncentivoGeneralController.create)

router.put('/update', validationUpdateIncentivo, IncentivoGeneralController.update)

router.put('/update-incentivo-lugar', validationUpdateIncentivoLugar, IncentivoGeneralController.updateIncentivoLugarRegistro)

router.post('/delete-incentivo-lugar', validationDeleteIncentivoLugar, IncentivoGeneralController.deleteIncentivoLugarRegistro)

router.delete('/delete', validationDeleteIncentivo, IncentivoGeneralController.delete)

router.get('/', IncentivoGeneralController.getAll)

router.get('/get-all', IncentivoGeneralController.consultaIncentivos)

module.exports = router