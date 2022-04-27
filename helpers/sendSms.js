const { PublishCommand } = require("@aws-sdk/client-sns");
const { snsClient } = require("./snsClient");

const sendSMSCode = async (numeroTelefono, codigoDescuento, nombre) => {
    const params = {
        Message: `Hola ${nombre} te damos la bienvenida a FXA! \nTu codigo de descuento es: ${codigoDescuento}`,
        PhoneNumber: numeroTelefono, 
        };
        
    try {
        const data = await snsClient.send(new PublishCommand(params))
        return {status:201,data,message:"Enviado Con Exito"}

    } catch (err) {
        return {status:200,err}
    }
}

module.exports = {
    sendSMSCode
}