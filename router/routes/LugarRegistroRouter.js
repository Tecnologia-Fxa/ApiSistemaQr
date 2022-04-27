const router = require("express").Router();

const LugarRegistroController = require("../../controller/LugarRegistroController");
const checkTokenLogin = require("../../helpers/validacionLogin");
const { validationCreate, validateId } = require("../../validations/validationLugarRegistro");

router.get('/', checkTokenLogin, LugarRegistroController.getAll)

router.get('/state-true', LugarRegistroController.getAllActive)

router.get('/find', checkTokenLogin, validateId, LugarRegistroController.getOne)

router.post('/create',  checkTokenLogin, validationCreate, LugarRegistroController.create)

router.put('/update',  checkTokenLogin, validationCreate, validateId, LugarRegistroController.update)

router.put('/disable',  checkTokenLogin, validateId, LugarRegistroController.disable)

router.put('/enable',  checkTokenLogin, validateId, LugarRegistroController.enable)

module.exports =  router