const router = require("express").Router();

const { ErrSendSms } = require("../../controller/ErrSendSms");
const { ChangeNumberUser } = require("../../controller/ChangeNumberUser");
const NewUsuario = require("../../controller/NewUsuario");

const { validationUsuario, validationErrSendSms } = require("../../validations/validationUsuario");

router.post('/reg', validationUsuario, NewUsuario.regUsu)

router.post('/err-send-sms', validationErrSendSms, ErrSendSms)

router.post('/err-change-number', ChangeNumberUser)

module.exports =  router