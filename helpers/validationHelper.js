/* Archivo que contiene la funcion que corrobora que los metodos validadores no hayan retornado algun error */

//Se importa el metodo que valida si hay o no errores
const { validationResult } = require('express-validator')

//Se define la funcion que retorna o no algun mensaje de error
const validateResult = (req, res, next) =>{
    //Bloque try catch para validar que el codigo no falle
    try {
        //Valide los parametros y si entre los parametros hay error por parte de los validadores, haga que el codigo falle
        validationResult(req).throw()
        //Si no hay error ejecute el codigo de manera normal
        return next()
    } catch (err) {
        //Si falla ejecute estado 400 y un arreglo con los errores
        res.status(400).json({errors:err.array()});
    }
}

//Ecporte la funcion para que esta sea usada en otro fragmento del codigo
module.exports = {
    validateResult
}