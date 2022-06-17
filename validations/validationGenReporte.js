/* Archivo que contiene la validacion de entrada de datos en el caso de usar el metodo de generar reporte */

//Importamos el metodo validador, que dara o no respuesta al final de ejecutar las validaciones
const { validateResult } = require('../helpers/validationHelper')

//Importamos todos los metodos de validacion que requerimos usar en nuestras funciones
const { validateExist, validateArray, validateEquals, validateParam, validateNum } = require('./validations')

//Funcion encargada de validar los campos que ingresan por el cuerpo de la solicitud en el caso de generar reporte
const validationGenReporte = [
    //Valida si existe un campo denominado "campos"
    validateExist('campos'),
    //Valida si este campo es un arreglo
    validateArray('campos'),
    //Valida si el contenido del arreglo es igual a lo requerido
    validateEquals('campos.*.campo',['nombres','apellidos','correo_electronico','fecha_nacimiento','telefono_contacto','numero_doc','createdAt']),
    //Valdia que exista un campo denominado "foraneas"
    validateExist('foraneas'),
    //Valida que el campo denominado "foraneas" sea un arreglo
    validateArray('foraneas'),
    //Valida que el contenido de este arreglo corresponde a alguna de las opciones descritas a continuacion
    validateEquals('foraneas.*.campo',['lugar_registro', 'estado_codigo']),
    //Valida que exista un campo denominado "condiciones"
    validateExist('condiciones'),
    //Valida que este campo sea un arreglo
    validateArray('condiciones'),
    //Valida que el contenido del arreglo corresponda a alguna de las siguientes opciones
    validateEquals('condiciones.*.campo',['nombres','apellidos','correo_electronico','fecha_nacimiento','telefono_contacto','numero_doc','createdAt']),
    //Valida que exista un campo denominado valor dentro edl arreglo
    validateParam('condiciones.*.valor'),
    //Valida que exista un campo denominado tipo que sea o 1 o 4
    validateEquals('condiciones.*.tipo',[1,4]),
    //Valida que exista un campo denominado "condiciones_num"
    validateExist('condiciones_num'),
    //Valida que este campo sea un arreglo
    validateArray('condiciones_num'),
    //Valida que el contenido del arreglo corresponda al requerido
    validateEquals('condiciones_num.*.campo',['lugar_registro', 'estado_codigo']),
    //Valida que exista un campo denominado valor
    validateParam('condiciones_num.*.valor'),
    //Valida que sea un número el campo valor dentro del arreglo
    validateNum('condiciones_num.*.valor'),
    //Valida que el tipo sea igual a 2 o 3
    validateEquals('condiciones_num.*.tipo',[2,3]),
    //Llamamos el metodo validador de funciones y si alguna fallo retorna el mensaje de error y si no pasa a la siguiente funcion
    (req,res,next)=>validateResult(req,res,next)
]

//Exportamos la funcion para usarla en otro lado del codigo
module.exports = { validationGenReporte }