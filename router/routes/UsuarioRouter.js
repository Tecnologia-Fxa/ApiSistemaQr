const router = require("express").Router();

const UsuarioController = require("../../controller/UsuarioController");

const { validationUsuario } = require("../../validations/validationUsuario");

router.post('/reg', validationUsuario, UsuarioController.regUsu)


module.exports =  router