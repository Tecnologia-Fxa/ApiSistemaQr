/* Archivo que contiene el controlador encargado de generar las campañas (Esta en fase de pruebas) */

//Importamos el modelo de campaña
const CampañaModel = require("../database/models/CampañaModel")

//Importamos el modelo de campaña usuario (tabla debil que deriva de la relacion de muchos a muchos entre usuario y campaña)
const CampañaUsuarioModel = require("../database/models/CampañaUsuarioModel")

//Importamos el modelo de plantilla
const PlantillaModel = require("../database/models/PlantillaModel")

//Importamos el modelo de usuario
const UsuarioModel = require("../database/models/UsuarioModel")

//Importamos el helper de enviar correo electronico
const { enviarCorreo } = require("../helpers/SendEmail")

//Importamos el helper de enviar mensaje de texto general
const { sendSMSGeneral } = require("../helpers/sendSms")

//Controlador encargado de gestionar campañas dependiendo los parametros establecidos (Pruebas)
const CampañaController = {

    //Metodo encargado de crear una nueva campaña
    new: async(req,res)=>{
        //Obtenemos el id de la plantilla que se desea utilizar por medio de la consulta
        const {id_plantilla} = req.query

        //Del cuerpo de la consulta obtenemos los usuarios, el nombre que va a tener la campaña, la fecha en la que se va a publicar la campaña y el metodo por el que se planea publicar
        const { usuarios, nombre_campaña, fecha_publicacion, metodo } = req.body

        //Obtenemos la plantilla segun el id consultado anterior mente
        const plantilla = await PlantillaModel.findOne({where:{id_plantilla}})

        //Obtenemos un arreglo que define los metodos por los cuales se va a publicar la campaña
        /**
         * Este arreglo tendria como ejemplo la siguiente estructura
         * ?arregloMetodo = [1,2,3]
         */
        const arregloMetodo = metodo.split(',')

        //Creamos una nueva campaña relacionando los parametros que entraron por la consulta
        const campañaCreada = await CampañaModel.create({
            //El nombre de la campaña
            nombre_campaña,
            //La fecha en la que se publica
            fecha_publicacion,
            //Los metodos en los que se publica
            metodo,
            //El id de la plantilla
            plantilla_fk: id_plantilla,
            //Y la presona(Rol/Usuario) que realiza la campaña
            credencial_fk: req.id_rol
        })

        //Recorremos el elemento usuarios para enviar el mensaje de manera individual
        usuarios.forEach(async(el) => {
            //Bloque try-catch para el manejo de errores
            try {
                //Obtenemos el usuario del telefono de contacto que fue enviado en la ruta
                const usuario = await UsuarioModel.findOne({where:{telefono_contacto:el.telefono_contacto}})

                //Dividimos la plantilla en dado caso que esta contenga los parametros &
                let array = plantilla.contenido.split('&')
                
                //Definimos una variable que contendra todo el texto de la plantilla
                let texto = ''

                //Recorremos el arreglo craedo antes de la plantilla
                array.forEach(el => {
                    //Si el contenido exacto de uno de estos objetos es "usuario.nombre" el valor de este objeto pasa a ser el nombre del usuario
                    if(el==="usuario.nombre")
                        el=usuario.nombres
        
                    //Pusheamos o concatenamos el elemento al texto
                    texto += el
                });
                
                //Creamos la relacion de la campaña con el usuario
                await CampañaUsuarioModel.create({
                    usuario_fk:usuario.id_usuario,
                    campaña_fk:campañaCreada.id_campaña
                })

                //Si el metodo incluye un 1 va a enviar por mensaje de texto
                //Pasa como argumentos el telefono del usaurio, y el texto creado anterior mente
                if(arregloMetodo.includes('1'))
                    sendSMSGeneral(usuario.telefono_contacto,texto)

                //Si el metodo incluye un 2 va a enviar un correo electronico
                //Pasa como argumentos el correo al que se va a enviar el titulo de la plantilla y el texto generado anterior mente
                if(arregloMetodo.includes('2')){
                    console.log(2)
                    enviarCorreo(usuario.correo_electronico, plantilla.titulo, texto)
                }

            } catch (error) {
                //En dado caso de que falle mostrara en la consola el error y en que numero de telefono ocurrio
                console.log("Ocurrio un error y no se envio el mensaje a:"+el.telefono_contacto)
            }
        })
        
        //Como respuesta general informa que se genero la campaña
        //TODO: ---------NOTA: Este mensaje lo retorna sin distinguir si un mensaje llego a no ser enviado
        res.json('Se ha generado la campaña')
        
    }
}

//Exportamos el controlador para que este sea usado en los routers
module.exports = CampañaController