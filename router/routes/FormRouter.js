const router = require("express").Router();

const { ErrSendSms } = require("../../controller/ErrSendSms");
const NewUsuario = require("../../controller/NewUsuario");

const { validationUsuario, validationErrSendSms } = require("../../validations/validationUsuario");

router.post('/reg', validationUsuario, NewUsuario.regUsu)

router.post('/err-send-sms', validationErrSendSms, ErrSendSms)


module.exports =  router