/* Archivo que contiene el controlador de registro de usuario por el formulario */

//Importamos el validador de resultados de express-validator
const { validationResult } = require("express-validator")

//Importamos el modelo de usuario que es donde se va a insertar el registro del nuevo usaurio
const UsuarioModel = require("../database/models/UsuarioModel")

//Importamos el modelo de codigo de descuento que es donde se va a crear el nuevo codigo de descuento
const CodigoDescuentoModel = require("../database/models/CodigoDescuentoModel");

//Importamos el objeto randomBytes de la libreria crypto el cual genera caracteres aleatorios
const {randomBytes} = require("crypto");

//Importamos axios el cual es una libreria que permite realizar consultas via http
const { default: axios } = require("axios");

//Importamos el helper de enviar Sms, el cual tiene toda la estructura y parametros para enviar un mensaje
const { sendSMSCode } = require("../helpers/sendSms");

//Importamos el helper de enviar codigo a Erk, el cual tiene la estructura para enviar el codigo a el web service de eureka
const SendCodeErk = require("../helpers/SendCodeErk");

//Creamos una funcion que nos va a ayudar a crear un codigo de descuento cada que se llame
const newCode = async() =>{
    //Definimos una variable como code, la cual va a tener como valor el resultado de la funcion de randomBytes La cual trae un numero y este se combierte a hexagesimal
    let code = randomBytes(Math.ceil(6 / 2)).toString('hex').slice(0, 6);

    //Definimos una nueva variable la cual tendra como resultado un arreglo de los codigos que tengan el mismo valor de code
    let result = await CodigoDescuentoModel.findAll({where:{desc_codigo:code}})

    //mientras que este resultado llega a tener algun elemento ejecute la siguiente linea de codigo
    while (result[0]) {
        //Vuelva a definir un nuevo codigo
        code = randomBytes(Math.ceil(6 / 2)).toString('hex').slice(0, 6);
        //Vuelva a definir result donde el resultado son los elementos que coincidan con code
        result = await CodigoDescuentoModel.findAll({where:{desc_codigo:code}})
    }
    
    //Si llega hasta esta parte del codigo es porque genero un nuevo codigo que no se encontraba en la base de datos

    //Retorne este nuevo codigo
    return code
}

//Importamos nuestro documento de variables de entorno
//Para esto usamos una libreria que nos facilita el trabajo llamada dotenv
//El archivo donde se encuentran las variables de entorno es ".env"
require ('dotenv').config();

//Creamos el controlador el cual tendra todas las funciones usadas para el reistro de nuevos usuarios
const NewUsuario = {

    //Esta funcion es llamada cada momento que un usuario se registra en el formulario, donde la funcion crea el registro en la bd y envia el codigo tanto a eureka cmo al celular del usuario via sms
    regUsu:async(req,res)=>{
        //Traemos los elementos del cuerpo de la consulta
        let {
            nombres, 
            apellidos, 
            correo_electronico, 
            fecha_nacimiento,
            telefono_contacto,
            numero_doc,
            lugar_registro_fk
        } = req.body
        
        //Defnimos errors para validar que estos elementos esten bien estructurados
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.json({ errors:errors.array() })
        }

        
        //Definimos una variable que contendra el resultado del usuario creado mas adelante
        //Se crea fuera del bloque para que sea una variable general
        let usuarioCreado
        
        //Bloque try-catch para el correcto manejo de errores
        try {
            
            //?-----------------Crear Usuario
            //Creamos el usuario a partir de los campos obtenidos por la consulta
            usuarioCreado = await UsuarioModel.create({
                nombres, 
                apellidos, 
                correo_electronico, 
                fecha_nacimiento,
                telefono_contacto,
                numero_doc,
                lugar_registro_fk
            })

            //?---------------- Generar Codigo de Descuento
            //Creamos un codigo de descuento para el usuario que se creo con anterioridad
            const codigoDescuentoCreado = await CodigoDescuentoModel.create({
                //Donde el contenido del codigo es el resultado de la funcion nombrada anterior mente 
                desc_codigo: await newCode(),
                //Y la foranea (relacion con usuario) es el id del usaurio que se acaba de crear
                usuario_fk:usuarioCreado.id_usuario
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
                id: usuarioCreado.numero_doc,
                //El porcentaje de descuento que tendra el codigo
                discount: process.env.DESCCODE
              })
              //Si llega a fallar eureka
              if(!msgSendCode.status==='0'){
                //Saltara a catch con el siguiente error y mensaje
                throw {type:"ServerError", message:msgSendCode.message};
              }

            //?------------- Enviar Mensaje De Texto
            //Usamos el helper de enviar smsCode el cual llama un servicio de aws para publicar el mensaje de texto en el celular del usuario
            const responseSms = await sendSMSCode( telefono_contacto, codigoDescuentoCreado.desc_codigo, usuarioCreado.nombres)
            //Si la respuesta no es igual a 201, va a fallar y notificar del error
            if(!responseSms.status === 201)
                throw {type:"SmsError", message:"Error al enviar el mensaje", err:responseSms.err};

            

            //?------------- Respuesta de La Api
            //Si todo esto se ejecuta de manera correcta el api va a dar una respuesta de usuario creado con exito
            res.json({message:"Usuario Registrado Con Exito"})
            
        }catch (error) {
            //En dado caso que el api falle va a ejecutar el siguiente fragmento de codigo

            //Si el error es alguno de los siguientes
            if (error.type ==="ServerError" || error.type ==="SmsError" || error.code==="ECONNREFUSED" || error.code==="ER_DUP_ENTRY"){
                //Va a eliminar el registro que se acaba de crear
                await UsuarioModel.destroy({where:{id_usuario:usuarioCreado.id_usuario}})
                //Yva a retornar mensaje de error el api
                res.json({error:error.message})

            //Pero si el error es por parte de aws y el sms va a enviar el siguiente error
            }else if(error.message ==="Validation error"){
                //Mensaje de error de reenviar el mensaje
                res.json({message:"Ocurrio un error, Porfavor reenvia el mensaje"})
            }else
                //Si no es ninguno de los anteriores que responda con el respectivo mensaje de error
                res.json({error:error.message}) 
        }

    }

}

//Exportamos el controlador para hacer usod e este en los diferentes modelos
module.exports = NewUsuario