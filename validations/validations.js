/* Archivo encargado de contener los metodos validadores para ser usados en cada funcion validadora */

//importamos el metodo check para validar una condicion en el cuerpo
//importamos el metodo query para validar una condicion en el encabezado de la solicitud
const { check, query } = require('express-validator');

//Este metodo es el encargado de verificar si existe o no un campo en el cuerpo de la solicitud
//como parametro recibe el nombre del campo
const validateExist = (param) =>{
    //Retorna la validacion del campo siguiendo las siguientes condiciones
    return check(param)
            //El campo existe // esta nombrado almenos
            .exists()
            //Si no envie el siguiente mensaje
            .withMessage('El Parametro debe estar definido')
}

//Valida que el campo sea un número de telefono logico
const validatePhone = (param) =>{
    return check(param)
            //Es un numero de telefono?
            .isMobilePhone()
            //Si no envie el siguiente mensaje
            .withMessage('El Parametro debe tener un formato de número de telefono valido')
}

//Valida que el campo sea un arreglo
const validateArray = (param) =>{
    return check(param)
            //El campo es un arreglo de informacion??
            .isArray()
            //Si no envie el siguiente mensaje
            .withMessage('El campo debe ser tipo Array')
}

//Valida que el campo exista y tenga un valor definido
const validateParam = (param) =>{
    return check(param)
            //El campo existe?
            .exists()
            //El campo tiene un dato?
            .not()
            //El campo no esta vacio?
            .isEmpty()
            //Si no encia el siguiente mensaje
            .withMessage('Debe registrar un valor')
}

//Valida que el campo exista y tenga un valor pero en este caso valida segun el encabezado de la solicitud
const validateParamQuery = (param)=>{
    return query(param)
            //Existe?
            .exists()
            //tiene un Dato?
            .not()
            //Esta vacio?
            .isEmpty()
            //Si no envia el siguiente mensaje
            .withMessage('Debe registrar un valor')
}

//Valida que el campo no tenga numeros ni caracteres especiales (util en los nombres)
const validateName = (param) =>{
    return check(param)
            //Es un campo de tipo texto
            //Acepte espacios
            .isAlpha('es-ES',{ignore: ' '})
            //Si no envie el siguiente mensaje
            .withMessage('Solo puede tener caracteres de la A a la Z')
}

//Valida el tamaño en caracteres de un campo
//Como parametros recive el nombre del campo y un objeto con el minimo y maximo que va a tener la validacion
const validateLength = (param, options) =>{
    return check(param)
            //El tamaño se encuentra entre los siguientes parametros
            .isLength({min: options.min, max: options.max})
            //Si no envia el siguiente mensaje
            .withMessage(`Tiene que tener minimo ${options.min} y maximo ${options.max} caracteres`)
}

//Valida que el campo tenga la logica de un correo electronico
const validateEmail = (param) =>{
    return  check(param)
            //Es un correo electronico logico?
            .isEmail()
            //si no envia el siguiente mensaje
            .withMessage('Debe tener un formato de correo valido')
}

//Valida que el campo tenga la estructura logica de una fecha
const validateDate = (param) =>{
    return check(param)
            //Es una fecha?
            .isDate()
            //Si no envie el siguiente mensaje
            .withMessage('Debe tener un formato de fecha valido (AAAA-MM-DD)')
}

//Valida que el campo se encuentre en un determinado arreglo de opciones
//recibe el nombre del campo y los posibles valores que deberia tener
const validateEquals = (param, values) =>{
    //Se hace un bucle para organizar la información que viene en values
    const array = []
    values.forEach(el => {
        array.push(el)
    });

    return check(param)
        //El campo se encuentra en la lista de posibles valores?
        .isIn(array)
        //Si no envie el siguiente mensaje
        .withMessage(`Debe Coincidir con las siguientes opciones ${array}`)
}

//Valida que el campo sea un numero entero
const validateNum = (param)=>{
    return check(param)
            //Es un numero entero?
            .isInt()
            //Si no envie el siguiente mensaje
            .withMessage('Debe tener un formato de número')
}


//Se exportan todas las funciones anteriormente descritas para poder hacer uso de estas en otras partes del codigo
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