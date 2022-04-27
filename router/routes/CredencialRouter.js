const router = require("express").Router();

const CredencialController = require("../../controller/CredencialController");
const checkTokenLogin = require("../../helpers/validacionLogin");
const { validationCredencial, validationChangePass } = require("../../validations/validationCredencial");

router.post('/login', validationCredencial, CredencialController.logIn)

router.get('/create-credentials', CredencialController.createCredencials)

router.put('/change-pass', checkTokenLogin, validationChangePass, CredencialController.changePassCredential)

module.exports =  router