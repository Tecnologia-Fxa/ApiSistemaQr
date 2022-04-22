const router = require("express").Router();

const  UsuarioController  = require("../../controller/UsuarioController");
const { validationUsuario } = require("../../validations/validationUsuario");


router.get('/', UsuarioController.getAll)

router.get('/filtered-users', UsuarioController.getFiltered)

router.put('/update', validationUsuario,UsuarioController.update)

router.delete('/delete', UsuarioController.delete)


module.exports =  router