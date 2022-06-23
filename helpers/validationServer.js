/* Archivo que contiene el metodo que valida si el servidor tiene o no permitido hacer una modificacion en el modulo de codigos */

//Importamos las variables de entorno con el siguiente metodo
require('dotenv').config();

//Importamos jwt-simple el cual se encarga de desencriptar el toquen
const jwt = require("jwt-simple")

//Metodo que da respuesta de error o no segun corresponda
const checkTokenServer = (req,res,next)=>{
    //Si NO esta definido en los headers de la consulta un campo denominado "token-server"
    if (!req.headers['token-server']) {
        //Retorne estadod e error de 401 con el mensjae de error correspondiente
        return  res.status(401).json({error: "Necesitas Incluir El Token De Acceso Para Acceder A Esta Función"});
    }
    //Si si esta definido ejecute las siguientes lineas

    //Defina una constante denominada token credencial la cual va a ser igual a el elemento "token-server" que esta definido en los headers
    const tokenCredencial = req.headers['token-server'];
    
    //Defina una variable denominada payload que va a tener una estructura de un objeto
    let payload = {};
    
    //Bloque try-catch si llega a fallar ejecuta el catch
    try {
        //payload va a ser igual a la decodificacion del token, con la frase secreta
        //La frace secreta se encuentra en las variables de entorno
        payload = jwt.decode(tokenCredencial, process.env.PASSDECODE);
    } catch (e) {
        //Si falla lo anterior(las fraces secretas no coinciden) retorne mensaje de error con estado 401
        return  res.status(401).json({error:'Token Invalido'});
    }

    //Si todo salio de manera adecuada continue con el flujo normal de funciones
    next();
}

//Exportamos el metodo para usarlo en tora seccion del codigo
module.exports = checkTokenServer