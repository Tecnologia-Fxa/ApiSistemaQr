/* Archivo que contiene los metodos que envian mensajes via sms a los usuarios */

//Importamos el metodo PublishCommand de aws para publicar los sms
const { PublishCommand } = require("@aws-sdk/client-sns");

//Importamos el cliente que fue creado con anterioridad
const { snsClient } = require("./snsClient");

//Creamos la funcion que se encarga de enviar el mensaje de codigo de verificación a los usuarios
//Como parametros solicitamos el número al que va aser enviado, el codigo de descuento y el nombre de la persona a la que se le va a enviar el mensaje
const sendSMSCode = async (numeroTelefono, codigoDescuento, nombre) => {
    
    //Definimos un objeto el cual tendra el mensaje y el numero de telefono
    const params = {
        //Campo que almacenara el contenido del mensaje a enviar
        Message: `Hola ${nombre} te damos la bienvenida a FXA! \nTu codigo de descuento es: ${codigoDescuento}`,
        //Campo que contendra el numero al que se le va a enviar el mensaje
        PhoneNumber: numeroTelefono, 
    };
    
    //bloque try-catch para responder en dado caso que falle con respectivo mensaje de error
    try {
        //se envia el mensaje usando el metodo de publishCommand enviando como argumentos el objeto params que fue creado antes
        const data = await snsClient.send(new PublishCommand(params))
        //retornamos estado 201, y mensaje de enviado con exito
        return {status:201,data,message:"Enviado Con Exito"}
    } catch (err) {
        //Si falla mostrara el error en la consola
        console.log(err)
        //Retorna estado 200 y mensaje de error
        return {status:200,err}
    }
}

//Creamos funcion que envia mensajes de campaña
//Como argumentos pasamos el numero de telefono y el mensaje que se quiere enviar
const sendSMSGeneral = async (numeroTelefono, mensaje) => {
    //Definimos un objeto el cual tendra el mensaje y numero de telefono como elementos
    const params = {
        Message: mensaje,
        PhoneNumber: numeroTelefono, 
        };
        
    //Bloque try-catch para el correcto manejo de errores
    try {
        //Enviamos el mensaje usando el objeto PublishComand enviando como argumento el objeto params
        const data = await snsClient.send(new PublishCommand(params))
        //Retornamos estado 201 y mensaje de creado con exito
        return {status:201,data,message:"Enviado Con Exito"}
    } catch (err) {
        //Mostramos en consola el error
        console.log(err)
        //Retornamos estado 200 y el error para hacer uso de este
        return {status:200,err}
    }
}

//Exportamos las 2 funciones creadas para hacer uso de estas en otra seccion del codigo 
module.exports = {
    sendSMSCode,
    sendSMSGeneral
}