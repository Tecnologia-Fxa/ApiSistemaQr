/* Archivo que contiene el metodo de envio de correos */

//Importamos la libreria de nodemailer la cual permite el envio de correos
const nodemailer = require("nodemailer");

//Creamos el metodo para enviar el correo
//Como parametros solicitamos el correo de destino, el asuto del correo y el mensaje del correo
const enviarCorreo = async(para, asunto, msj) => {
  //creamos un objeto denominado transporter, de la respuesta del metodo createTransport
  //Donde enviamos el host de nuestro correo, el puerto donde se envia, y usuario y contraseña como auth
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: '587',
    auth: {
      user: "SISTEMAS@FUXIAACCESORIOS.COM",
      pass: "",
    },
  });

  //Como opciones de correo definimos un objeto
  const mailOptions = {
      //Definimos el correo donde sera enviado
      from: "SISTEMAS@FUXIAACCESORIOS.COM",
      //Definimos la persona que lo recive
      to: para,
      //Definimos el asunto del correo
      subject: asunto,
      //Definimos el mensaje del correo (es html para que soporte el etiquetado cuando se pueda)
      html: msj,
  };

  //llamamos la funcion de enviar correo del transporter
  //como argumentos le pasamos las opciones que definimos con anterioridad, y un callback para el retorno de esta funcion
  transporter.sendMail(mailOptions, (error, info) => {
    //Si hay un error al enviar el correo
    if (error) {
      //Retorne mensaje de error
      console.log(error)
      return 'Error al enviar el correo.'
    } else {
      //Si no envia mensaje de correo enviado
      return 'Correo enviado'
    }
  })

};

//Exportamos el metodo para hacer uso de este en otra seccion del codigo
module.exports = { enviarCorreo };