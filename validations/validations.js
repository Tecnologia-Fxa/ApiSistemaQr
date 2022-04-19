const { check } = require('express-validator');

const validateParam = (param) =>{
    return check(param)
            .exists()
            .not()
            .isEmpty()
            .withMessage('Debe registrar un valor')
}

const validateName = (param) =>{
    return check(param)
            .isAlpha('es-ES',{ignore: ' '})
            .withMessage('Solo puede tener caracteres de la A a la Z')
}

const validateLength = (param, options) =>{
    return check(param)
            .isLength({min: options.min, max: options.max})
            .withMessage(`Tiene que tener minimo ${options.min} y maximo ${options.max} caracteres`)
}

const validateEmail = (param) =>{
    return  check(param)
            .isEmail()
            .withMessage('Debe tener un formato de correo valido')
}

const validateDate = (param) =>{
    return check(param)
            .isDate()
            .withMessage('Debe tener un formato de fecha valido (AAAA-MM-DD)')
}

module.exports ={
    validateParam,
    validateLength,
    validateName,
    validateDate,
    validateEmail
}