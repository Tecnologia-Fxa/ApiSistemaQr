const { check, query } = require('express-validator');

const validateExist = (param) =>{
    return check(param)
            .exists()
            .withMessage('El Parametro debe estar definido')
}

const validatePhone = (param) =>{
    return check(param)
            .isMobilePhone()
            .withMessage('El Parametro debe tener un formato de número de telefono valido')
}

const validateArray = (param) =>{
    return check(param)
            .isArray()
            .withMessage('El campo debe ser tipo Array')
}

const validateParam = (param) =>{
    return check(param)
            .exists()
            .not()
            .isEmpty()
            .withMessage('Debe registrar un valor')
}

const validateParamQuery = (param)=>{
    return query(param)
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

const validateEquals = (param, values) =>{
    const array = []
    values.forEach(el => {
        array.push(el)
    });

    return check(param)
        .isIn(array)
        .withMessage(`Debe Coincidir con las siguientes opciones ${array}`)
}

const validateNum = (param)=>{
    return check(param)
            .isInt()
            .withMessage('Debe tener un formato de número')
}


module.exports ={
    validateExist,
    validateParam,
    validateLength,
    validateNum,
    validateName,
    validateDate,
    validateEmail,
    validateEquals,
    validatePhone,
    validateParamQuery,
    validateArray
}