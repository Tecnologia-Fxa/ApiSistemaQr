/* Archivo que contiene la configuracion al cliente de aws para el envio de mensajes */

//Importamos el elemento SNSClient de el sdk de aws
const  { SNSClient } = require("@aws-sdk/client-sns");

//Definimos la region de la cual se va a hacer uso del servicio de aws en este caso "us-east-1" (norte de virginia)
const REGION = "us-east-1"; 

//Definimos un nuevo elemento con la configuracion de aws (el usuario y contraseña se encuentran en las variables de entorno del sistema)
const snsClient = new SNSClient({ region: REGION })

//Exportamos este elemento para hacer usod e este en otra linea del codigo
module.exports = {
    snsClient
}