const router = require("express").Router();

const { ChangeStatusCode } = require("../../controller/ChangeStatusCode");
const checkTokenServer = require("../../helpers/validationServer");
const { validationCode } = require("../../validations/validationCode");

router.post('/cod-validate', checkTokenServer, validationCode, ChangeStatusCode)

module.exports =  router