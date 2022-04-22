const router = require("express").Router();

const LugarRegistroController = require("../../controller/LugarRegistroController");

router.get('/', LugarRegistroController.getAll)

router.get('/find', LugarRegistroController.getOne)

router.post('/create', LugarRegistroController.create)

router.put('/update', LugarRegistroController.update)

router.put('/disable', LugarRegistroController.disable)

router.put('/enable', LugarRegistroController.enable)

module.exports =  router