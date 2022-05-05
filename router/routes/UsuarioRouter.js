const router = require("express").Router();

const  UsuarioController  = require("../../controller/UsuarioController");
const { validationFilterOptions, validationStatusCode, validationPagination, validationDateOptions } = require("../../validations/validationFilterOptions");
const { validationUsuario, validateId } = require("../../validations/validationUsuario");


router.get('/', validationPagination, UsuarioController.getAll)

router.get('/filtered-users', validationFilterOptions, validationPagination, UsuarioController.getFiltered)

router.get('/filter-by-date-range', validationDateOptions, validationPagination, UsuarioController.filterByDateRange)

router.get('/getby-state-code', validationStatusCode, UsuarioController.getbyStateCod)

router.put('/update', validationUsuario, validateId, UsuarioController.update)

router.delete('/delete', validateId, UsuarioController.delete)


module.exports =  router