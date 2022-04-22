const router = require("express").Router();

const CredencialController = require("../../controller/CredencialController");

router.post('/login', CredencialController.logIn)

router.get('/create-credentials', CredencialController.createCredencials)

router.put('/change-pass', CredencialController.changePassCredential)

module.exports =  router