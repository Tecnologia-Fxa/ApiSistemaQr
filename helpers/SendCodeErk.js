/* Arhivo que contiene el metodo que envia el codigo a eureka */

//Se define axios, axios es una libreria que permite hacer solicitudes a otros servicios
const { default: axios } = require("axios");

//Importamos las variables de entorno
//El archivo donde se encuentran las variables de entorno es ".env"
require ('dotenv').config();


//Exportamos la funcion asyncrona que realiza el envio del codigo a eureka
module.exports = async(data) => {
    //definimos una costante que va a ser la respuesta que dio el servidor
    //Ejecutamos una solicitud post, donde en primera condicion enviamos la url del servidor, despues la data, y por ultimo la autorización
    const respErk = await axios.post(process.env.URLCODE, data, {
        auth:{
            //Usuario
            username:process.env.USERCODE,
            //Contraseña
            password:process.env.PASSWORDCODE
        }
    })
    //Retorno del mensaje de eureka
    return respErk.data
}