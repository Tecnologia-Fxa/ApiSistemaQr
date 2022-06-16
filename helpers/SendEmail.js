const nodemailer = require("nodemailer");

const enviarCorreo = async(para, asunto, msj) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: '587',
    auth: {
      user: "SISTEMAS@FUXIAACCESORIOS.COM",
      pass: "ymZ05TRO4KnhpYMv",
    },
  });

  const mailOptions = {
      from: "SISTEMAS@FUXIAACCESORIOS.COM",
      to: para,
      subject: asunto,
      html: msj,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    
    if (error) {
      return 'Error al enviar el correo.'
    } else {
      return 'Correo enviado'
    }
  })
  

};

module.exports = { enviarCorreo };