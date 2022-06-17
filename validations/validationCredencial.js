/* Archivo que valida la data que entra para el modulo de credenciales */

//Importamos el metodo validador
const { validateResult } = require('../helpers/validationHelper')

//Importamos las funciones de validacion de campos
const { validateParam, validateEquals } = require('./validations')

//Funcion que valida el inicio de sesion
const validationCredencial = [
    //Valida que exista un campo denominado "nombre_usuario"
    validateParam('nombre_usuario'),
    //Valida que exista un campo denominado "contraseña"
    validateParam('contraseña'),
    //Usamos el metodo valdiador que retorna mensaje de error en dado caso que alguna de las funciones anteriores falle
    (req,res,next)=>validateResult(req,res,next)
]

//Funcion que valida el cambio de contraseña de un rol en especifico
const validationChangePass =[
    //Valdia que exista un campo "contraseña"
    validateParam('contraseña'),
    //Valida que exista un campo "nombre_usuario"
    validateParam('nombre_usuario'),
    //Valida si el campo es igual a las opciones dadas
    validateEquals('nombre_usuario',['Admin', 'Analista', 'Tecnologia']),
    //Valida si hay un campo "nueva_contraseña"
    validateParam('nueva_contraseña'),
    //Usamos el metodo valdiador que retorna mensaje de error en dado caso que alguna de las funciones anteriores falle
    (req,res,next)=>validateResult(req,res,next)
]

//Exportamos las funciones para usarlas en otra parte del codigo
module.exports = { validationCredencial, validationChangePass }