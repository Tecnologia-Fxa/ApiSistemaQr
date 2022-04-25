const router = require("express").Router();

const  UsuarioController  = require("../../controller/UsuarioController");
const { validationFilterOptions, validationStatusCode } = require("../../validations/validationFilterOptions");
const { validationUsuario } = require("../../validations/validationUsuario");


router.get('/', UsuarioController.getAll)

router.get('/filtered-users', validationFilterOptions, UsuarioController.getFiltered)

router.get('/getby-state-code', validationStatusCode, UsuarioController.getbyStateCod)

router.put('/update', validationUsuario,UsuarioController.update)

router.delete('/delete', UsuarioController.delete)


module.exports =  router