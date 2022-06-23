/* Archivo que contiene la funcion que valida si en la consulta se encuentra el token de acceso */

//Importamos las variables de entorno
require('dotenv').config();

//Importamos jwt el cual es la libreria que es usada para encriptar y desencriptar
const jwt = require("jwt-simple")

//Se iumporta moment el cual es una libreria que hace uso de fecahs y tiempo de manera sencilla
const moment = require("moment")

//Definimos la funcion que retorna error o prosigue con el flujo
const checkTokenLogin = (req,res,next)=>{
    //Si no se enceuntra definido en los headers un campo denominado "token-login"
    if (!req.headers['token-login']) {
        //Retorne estado de error 401(acceso denegado) con el mensaje de error
        return  res.status(401).json({error: "Necesitas iniciar sesión para acceder a este contenido"});
    }
    //Si no falla sigue con el flujo normal

    //Defina tokenCredencial con el valor que tiene el campo de los encabezados
    const tokenCredencial = req.headers['token-login'];
    
    //Defina una variable denominada payload
    let payload = {};
    
    //Bloque try catch, el cual si falla retorna mensaje de error
    try {
        //payload va a ser igual a la decodificacion del token con la frase de acceso definida en el sistema
        //El token al ser decodificado es un objeto de js con campos que seran usados a continuacion
        payload = jwt.decode(tokenCredencial, process.env.PASSDECODE);
    } catch (e) {
        //Si no coincide la estructura va a fallar arrojando estado 401 y respectivo mensaje de error
        return  res.status(401).json({error:'Necesitas iniciar sesión para acceder a este contenido'});
    }

    //Si el elemento de payload denominado "expiredAt" es menor a la hora y fecha actual
    if (payload.expiredAt < moment().unix()) {
        //Retornara estado 408(sesion a expirado) con respectivo0 mensaje de error
        return  res.status(408).json({error:`El tiempo limite de uso en la pagina a caducado, por favor vuelva a iniciar sesión`});
    }

    //En el campo de parametros vamos a definir rol con un valor igual al rol de payload
    req.rol = payload.rol

    //Asi mismo vamos a definir un campo denominado id_rol
    req.id_rol = payload.id_rol

    //Si todo sale bien continuara con el flujo de funciones
    next();
}

//Exportamos la funcion para que sea usara en cualquier linea de codigo que sea requerida
module.exports = checkTokenLogin