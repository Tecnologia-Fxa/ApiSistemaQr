/* Archivo que contiene el controlador de plantilla(plantilla de los mensajes a enviar en la fase 2) */

//Importamos el modelo de plantilla ya que es clave en este controlador
const PlantillaModel = require("../database/models/PlantillaModel")

//Importamos el modelo de usuario para hacer uso de este como referencia de consulta
const UsuarioModel = require("../database/models/UsuarioModel")

//Definimos nuestro controlador el cual es un objeto de funciones
const PlantillaController = {

    //Este metodo es para obtener todos los registros de plantillas, para hacer gestion despues de estas
    getAll:async(_req,res)=>{
        //Definimos plantillas como el resultado de la consulta findAll al modelo de plantilla
        const plantillas = await PlantillaModel.findAll()
        //Respondemos con la variable definida anterior mente
        res.json(plantillas)
    },

    //Este metodo se utiliza para obtener una sola plantilla (Es util al momento de enviar el mensaje)
    getOne:async(req,res)=>{
        //Obtenemos un id de la plantilla a consultar a travez de la consulta
        const { id } = req.query
        //Definimos plantilla como el resultado de la consulta findOne al modelo de plantilla
        //Donde el id de la plantilla sea igual al id establecido en la consulta
        const plantilla = await PlantillaModel.findOne({where:{id_plantilla:id}})
        //Respuesta del api sera la plantilla consultada anterior mente
        res.json(plantilla)
    },

    //Este metodo sirve para crear una nueva plantilla
    create: async(req,res)=>{
        //Del cuerpo de la consulta recivimos el titulo de la plantilla, el contenido de la plantilla, y la url_imagen de la plantilla... este ultimo es opcional
        const {titulo, contenido, url_imagen} = req.body
        //Creamos esta plantilla pasando como atributos los elementos nombrados anterior mente
        await PlantillaModel.create({
            titulo,
            contenido,
            url_imagen
            //Si todo sale bien responda con mensaje de creado
        }).then(()=>res.json('Creado'))
    },

    //Este metodo sirve para actualizar las plantillas que han sido creadas con anterioridad
    update: async(req,res)=>{
        //Traemos los parametros del cuerpo de la consulta 
        const {titulo, contenido, url_imagen} = req.body

        //Traemos el id de la plantilla que se desea actualizar
        const { id } = req.query

        //Usamos el metodo update para actualizar la plantilla 
        //Pasamos como parametros las variables anterior mente obtenidas del cuerpo de la consulta
        await PlantillaModel.update({
            titulo,
            contenido,
            url_imagen
        }, 
        {
            //Donde el id de la plantilla corresponda al id pasado por la consulta
            where:{id_plantilla:id}
            //Si todo sale correcto responda con mensaje de actualizado
        }).then(()=>res.json('Actualizado'))
    },

    //Prueba del correcto funcionamiento del envio de mensajes segun la plantilla
    prueba: async(req,res)=>{
        //Se obtiene el id de la plantilla de la consulta
        const {id_plantilla} = req.query

        //Se obtiene la plantilla segun el id enviado 
        const plantilla = await PlantillaModel.findOne({where:{id_plantilla}})

        //Se hace la prueba de traer el usaurio segun el número de telefono
        const usuario = await UsuarioModel.findOne({where:{telefono_contacto:'+573209897269'}})
        
        /**
         * Como se planea en la plantilla adjuntar el nombre y que sea personalizado
         * se postulo que la manera adecuada para esto era usar "divisores" de cadena
         * De la siguiente manera:
         * ?Hola &usuario.nombre& como estas?
         * Esto al ser comvertido en el siguiente fragmento de codigo quedaria de la siguiente manera
         * *Hola Pepito como estas?
         */
        
        //Obtenemos un arreglo de la cadena donde cada parte del arreglo es el texto seguido de &
        /**
         * Con el ejemplo anterior este metodo haria
         * * ["Hola", "usuario.nombre", " Como estas?"]
         */
        let array = plantilla.contenido.split('&')
        
        //Definimos una variable que va a almacenar y agrupar todas las partes del arreglo anterior
        let texto = ''

        //Hacemos un bucle que recorra cada una de las partes del arreglo
        array.forEach(el => {
            //Si el elemento del arreglo es igual a "usuario.nombre"
            if(el==="usuario.nombre")
                //Va a definir el elemento del arreglo como el nombre del usuario consultado
                el=usuario.nombres

            //Concatenamos al texto el elemento
            texto += el
        })

        //Respondemos con el texto
        res.json(texto)
        //TODO: Lo anterior solo es una prueba de el funcionamiento, es opcional o no eliminar el metodo
    }
}

//Exportamos el controlador para usarlo en los routers
module.exports = PlantillaController