const router = require("express").Router();

const LugarRegistroController = require("../../controller/LugarRegistroController");
const { validationCreate, validateId } = require("../../validations/validationLugarRegistro");

router.get('/', LugarRegistroController.getAll)

router.get('/state-true', LugarRegistroController.getAllActive)

router.get('/find', validateId, LugarRegistroController.getOne)

router.post('/create', validationCreate, LugarRegistroController.create)

router.put('/update', validationCreate, validateId, LugarRegistroController.update)

router.put('/disable', validateId, LugarRegistroController.disable)

router.put('/enable', validateId, LugarRegistroController.enable)

module.exports =  router