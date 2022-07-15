const IncentivoGeneralController = require("../../controller/IncentivoGeneralController");

const router = require("express").Router();

router.post('/create', IncentivoGeneralController.create)

router.get('/', IncentivoGeneralController.getAll)

router.get('/get-all', IncentivoGeneralController.consultaIncentivos)

module.exports = router