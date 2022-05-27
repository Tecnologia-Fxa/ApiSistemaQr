const router = require("express").Router();

const LugarRegistroController = require("../../controller/LugarRegistroController");
const checkTokenLogin = require("../../helpers/validacionLogin");
const { checkAdmin } = require("../../helpers/validationUser");
const { validationCreate, validateId } = require("../../validations/validationLugarRegistro");

router.get('/', checkTokenLogin, LugarRegistroController.getAll)

router.get('/state-true', LugarRegistroController.getAllActive)

router.get('/find', checkTokenLogin, validateId, LugarRegistroController.getOne)

router.post('/create',  checkTokenLogin, checkAdmin, validationCreate, LugarRegistroController.create)

router.put('/update',  checkTokenLogin, checkAdmin, validationCreate, validateId, LugarRegistroController.update)

router.put('/disable',  checkTokenLogin, checkAdmin, validateId, LugarRegistroController.disable)

router.put('/enable',  checkTokenLogin, checkAdmin, validateId, LugarRegistroController.enable)

module.exports =  router