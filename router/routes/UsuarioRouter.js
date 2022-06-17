/* Archivo que contiene la redireccion a los metodos segun corresponda en la ruta en este caso para los metodos de consulta de usuarios */

//importamos el router de express para analisar la consulta
const router = require("express").Router();

//Importamos el controlador de usuario
const  UsuarioController  = require("../../controller/UsuarioController");

//Importamos metodo de validacion de roles, en este caso valida si es el rol de admin
const { checkAdmin } = require("../../helpers/validationUser");

//Importamos los metodos de validaciond e la informacion que entra en el api, en este caso valida para los filtros de usuario
const { validationFilterOptions, validationStatusCode, validationPagination, validationDateOptions } = require("../../validations/validationFilterOptions");

//Importamos los metodos de validaciond e informacion, en este caso valida los campos de usuario
const { validationUsuario, validateId } = require("../../validations/validationUsuario");


//Cuando la ruta venga vacia, va a validar los campos de paginacion, y usara el metodo getAll del controlador de usuario
//Este metodo traera todos los usuarios registrados, haciendo uso de la paginacion para evitar colapsos
router.get('/', validationPagination, UsuarioController.getAll)

//Cuando la ruta sea "/filtered-users", va a validar las opciones de filtro, despues valida las opciones de paginacion y por ultimo ejecuta el metodo getFiltered del controlador de usuario
//Este metodo traera los usuario segun un determinado filtro
router.get('/filtered-users', validationFilterOptions, validationPagination, UsuarioController.getFiltered)

//Cuando la ruta sea "/filter-by-date-range", va a validar las opciones de filtro por fecha, despues valida las opciones de paginacion y por ultimo ejecuta el metodo filterByDateRange del controlador de usuario
//Este metodo traera los usuario segun un determinado filtro de fechas
router.get('/filter-by-date-range', validationDateOptions, validationPagination, UsuarioController.filterByDateRange)

//Cuando la ruta sea "/update", va a validar que sea el rol de administrador el que ejecuta la tarea, va a validar la data de usuario, y despues valida que exista un id en la consulta... para finalizar ejecuta el metodo update del controlador de usuario
//Este metodo actualiza la informacion del usuario, en dado caso que hayan datos erroneos, pero solo la puede ejecutar el daministrador del sistema
router.put('/update', checkAdmin, validationUsuario, validateId, UsuarioController.update)

//Cuando la ruta sea "/delete", va a validar que sea el rol admin, despues valida que haya un id en la consulta y por ultimo ejecuta el metodo delete del controlador de usuario
//Este metodo elimina un registro permanentemente de la base de datos del sistema.
router.delete('/delete', checkAdmin, validateId, UsuarioController.delete)

module.exports =  router