/* Archivo que contiene el metodo que reenvia un mensaje en dado caso que haya algun error en el envio de codigos en los mensajes */

//Importamos la libreria de axios la cual nos sirve para hacer solicitudes via http
const { default: axios } = require("axios")

//Importamos randomBytes de crypto el cual nos ayuda a generar un numero aleatorio
const { randomBytes } = require("crypto")

//Importamos el modelo de codigo de descuento
const CodigoDescuentoModel = require("../database/models/CodigoDescuentoModel")

//Importamos el modelo de usuario
const UsuarioModel = require("../database/models/UsuarioModel")

//Importamos el helper de enviar codigo via mensaje de texto, el cual es una funcion que envia el mensaje de texto con el servicio de aws
const { sendSMSCode } = require("../helpers/sendSms")

//Creamos la funcion que se encarga de generar un nuevo codigo de descuento basandose en los que ya existen en la base de datos
const newCode = async() =>{

    //Definimos code con valor resultado de la funcion randomBytes la cual genera numeros y letras al azar
    let code = randomBytes(Math.ceil(6 / 2)).toString('hex').slice(0, 6);
    //Ahora consultamos si el codigo generado anterior mente ya se encuentra en la base de datos, de ser asi buscara un nuevo codigo a generar
    let result = await CodigoDescuentoModel.findAll({where:{desc_codigo:code}})
    //Mientras que encuentre resultados iguales al codigo en la base de datos ejecute la siguiente linea de codigo
    while (result[0]) {
        //Genere un nuevo codigo
        code = randomBytes(Math.ceil(6 / 2)).toString('hex').slice(0, 6);
        //Compare el nuevo codigo con los que ya hay en la base de datos
        result = await CodigoDescuentoModel.findAll({where:{desc_codigo:code}})
    }
    //Si el codigo no esta en la base de datos retornelo
    return code
}

//Importamos nuestro documento de variables de entorno
//Para esto usamos una libreria que nos facilita el trabajo llamada dotenv
//El archivo donde se encuentran las variables de entorno es ".env"
require ('dotenv').config();

//Se declara la funcion la cual sera la encargada de reenviar el mensaje o generar un nuevo codigo en caso de que se requiera
const ErrSendSms = async(req,res)=>{
    //Obtenemos el telefono de contacto del cuerpo de la consulta
    const { telefono_contacto } = req.body

    //Obtenemos el usuario si existe del modelo de usuarios donde el telefono corresponda al enviado por la el cuerpo de la consulta
    const usuario = await UsuarioModel.findOne({
        //Condicion de telefono
        where:{telefono_contacto},
        //Atributos que deseamos traer del usuario
        attributes:['id_usuario', 'nombres', 'telefono_contacto'],
        //Incluyame el modelo de Codigo de descuento si lo tiene
        include:{
            model:CodigoDescuentoModel,
            //Traigame estos atributos del modelo de codigo de descuento
            attributes:['id_codigo_descuento', 'desc_codigo', 'estado']
        } 
    })

    //Si si encontro un usuario
    if(usuario){
        //Bloque try-catch  para el manejo de errores
        try {

            //Si existe un codigo de descuento para el usuario ejecute el siguiente fragmento de codigo
            if(usuario.codigo_descuento){
                //Si este codigo de descuento tiene un estado de 0 (sin canjear)
                if(!usuario.codigo_descuento.estado){
                    //?------------- Enviar Mensaje De Texto
                    //Va a envair el mensaje de texto haciendo uso de la funcion declarada en el helper, enviando como argumentos el telefono, el codigo de descuento y los nombres del usuario
                    const responseSms = await sendSMSCode( telefono_contacto, usuario.codigo_descuento.desc_codigo, usuario.nombres)
                    //Si ocurre algun error va a hacer fallar el bloque try-catch y envaira respectivo mensaje de error
                    if(!responseSms.status ===201)
                        throw {type:"SmsError", message:"Error al enviar el mensaje", err:responseSms.err};

                    //Si no ocurre ningun error enviara mensaje de exito
                    res.json("Codigo Reenviado")
                    
                }else{
                    //Si el estado del codigo ya es canjeado informara que este codigo ya se canjeo, entonces no es necesario enviar otro telefono
                    res.json("El código ya ha sido canjeado")
                }

            //Pero si el usuario no tiene ningun codigo de descuento asignado va a ejecutar el siguiente fragmento de codigo
            }else{
                //Creara un codigo de descuento en la respectiva tabla 
                const codigoDescuentoCreado = await CodigoDescuentoModel.create({
                    //Para la descripcion del codigo va a ejecutar la funcion de nuevo codigo que fue definida con anterioridad
                    desc_codigo: await newCode(),
                    //Como relacion con usuario enviamos el id del usuario que fue consultado con anterioridad
                    usuario_fk:usuario.id_usuario
                })
                
                //?-------Enviar Codigo a Eureka
                    //Una vez se crea el codigo y la relacion con el usuario se realiza el envio del codigo a eureka
                    //Para esto se usa el metodo que se definio en los helpers donde se le pasa como arumento un objeto con la estructura solicitada por eureka
                    const msgSendCode = await SendCodeErk({
                        //El meto al que se quiere acceder en el web service de eureka
                        method: "Coupons/set_coupon",
                        //El codigo de descuento que se acaba de generar
                        code: codigoDescuentoCreado.desc_codigo,
                        //La identificacion del usuario que se acaba de crear
                        id: usuario.numero_doc,
                        //El porcentaje de descuento que tendra el codigo
                        discount: process.env.DESCCODE
                    })
                    //Si llega a fallar eureka
                    if(!msgSendCode.status==='0'){
                        //Saltara a catch con el siguiente error y mensaje
                        throw {type:"ServerError", message:msgSendCode.message};
                    }
                    
                if(!msgSendCode.codigo)
                    throw {type:"ServerError", message:"Error en el servidor"};

                //?------------- Enviar Mensaje De Texto
                //Usamos el helper de enviar smsCode el cual llama un servicio de aws para publicar el mensaje de texto en el celular del usuario
                const responseSms = await sendSMSCode( telefono_contacto, codigoDescuentoCreado.desc_codigo, usuarioCreado.nombres)
                //Si la respuesta no es igual a 201, va a fallar y notificar del error
                if(!responseSms.status === 201)
                    throw {type:"SmsError", message:"Error al enviar el mensaje", err:responseSms.err};

            

                //?------------- Respuesta de La Api
                //Si todo esto se ejecuta de manera correcta el api va a dar una respuesta de usuario creado con exito
                res.json("Codigo Reenviado")
            }

        }catch (error) {
            //Si llega a haber algun error respondera con el error
            res.json({error:error.message}) 
        }

    }else
        //Si no encuentra un usuario va a envair el siguiente mensaje indicando que es necesario un registro previo
        res.json("Es necesario un registro previo para reenviar el mensaje")
    

    

}

//Exportamos la funcion para que se pueda usar en el respectivo router
module.exports = {ErrSendSms}