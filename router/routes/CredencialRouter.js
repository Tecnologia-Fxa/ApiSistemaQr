const router = require("express").Router();

const CredencialController = require("../../controller/CredencialController");
const { validationCredencial } = require("../../validations/validationCredencial");

router.post('/login', validationCredencial, CredencialController.logIn)

router.get('/create-credentials', CredencialController.createCredencials)

router.put('/change-pass', CredencialController.changePassCredential)

module.exports =  router