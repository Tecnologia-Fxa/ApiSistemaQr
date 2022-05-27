const router = require("express").Router();

const  UsuarioController  = require("../../controller/UsuarioController");
const { checkAdmin } = require("../../helpers/validationUser");
const { validationFilterOptions, validationStatusCode, validationPagination, validationDateOptions } = require("../../validations/validationFilterOptions");
const { validationUsuario, validateId } = require("../../validations/validationUsuario");


router.get('/', validationPagination, UsuarioController.getAll)

router.get('/filtered-users', validationFilterOptions, validationPagination, UsuarioController.getFiltered)

router.get('/filter-by-date-range', validationDateOptions, validationPagination, UsuarioController.filterByDateRange)

router.put('/update', checkAdmin, validationUsuario, validateId, UsuarioController.update)

router.delete('/delete', checkAdmin, validateId, UsuarioController.delete)


module.exports =  router