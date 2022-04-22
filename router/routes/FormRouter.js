const router = require("express").Router();

const { ErrSendSms } = require("../../controller/ErrSendSms");
const NewUsuario = require("../../controller/NewUsuario");

const { validationUsuario } = require("../../validations/validationUsuario");

router.post('/reg', validationUsuario, NewUsuario.regUsu)

router.post('/err-send-sms', ErrSendSms)


module.exports =  router