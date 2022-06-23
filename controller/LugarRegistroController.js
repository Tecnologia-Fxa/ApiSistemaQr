/* Archivo que contiene el controlador de lugar de registro*/

//Importamos el modelo de lugar de registro
const LugarRegistroModel = require("../database/models/LugarRegistroModel")

//Creamos el controlador de lugar de registro el cual contiene todos los metodos respectivos para gestionar los registros en la bd relacionados con los lugares de registro
const LugarRegistroController = {

    //Metodo que traera todos los lugares de registro que se encuentren en la bd
    getAll:async(_req,res)=>{
        //Se define un elemento que contendra todos los lugares de registro, que se obtienen del metodo findAll
        const lugares = await LugarRegistroModel.findAll()
        //respondemos con el arreglo todos los lugares obtenidos anteriormente
        res.json(lugares)
    },

    //Metodo que obtiene todos los lugares de registro que se encuentren activos
    getAllActive:async(_req,res)=>{
        //Se obtienen todos los lugares de registro mediante el metodo findAll, donde el estado sea igual a true(Activo) y que lo ordene automaticamente por nombre
        const lugares = await LugarRegistroModel.findAll({where:{estado:true},order: [['nombre_lugar_registro','ASC']]})
        //Retornamos el arreglo de los lugares obtenidos anteriormente
        res.json(lugares)
    },

    //Metodo que obtiene un solo lugar de registro por medio del id
    getOne:async(req,res)=>{
        //Obtenemos el id del lugar a consultar por medio de la consulta
        const { id_lugar_registro } = req.query

        //Obtenemos un lugar de registro segun el id enviado en la consulta
        const lugar = await LugarRegistroModel.findOne({where:{id_lugar_registro}})
        //Retornamos el lugar que fue consultado anterior mente
        res.json(lugar)
    },

    //Metodo que se encarga de crear un nuevo lugar de registro, por defecto cada lugar creado es activo
    create:async(req,res)=>{
        //Obtenemos del cuerpo de la consulta el nombre del lugar de registro a crear
        const {nombre_lugar_registro} = req.body

        //Bloque try-catch para el manejo de errores
        try {
            //Crear el lugar de registro dando como parametro el nombre que fue dado en el cuerpo de la consulta
            await LugarRegistroModel.create({nombre_lugar_registro})
            //Si se ejecuto con exito retornamos mensaje de creado con exito
            res.json("Creado Con Exito")
        } catch (error) {
            //En caso de que falle retorne estado 400 con mensaje de error respectivo
            res.status(400).json(error.message)
        }
    },

    //Metodo que se utiliza para actualiazr un lugar de registro que se haya creado con anterioridad
    update:async(req,res)=>{
        //traemos del cuerpo de la consulta el nuevo nombre a definir del lugar de registro
        const {nombre_lugar_registro} = req.body

        //Traemos el id del lugar a actualizar de la consulta
        const {id_lugar_registro} = req.query

        //Bloque try-catch para el manejo de errores
        try {
            //Usamos el metodo update para actualizar un registro, pasamos como parametro el nombre... donde el id corresponda al enviado en la consulta
            await LugarRegistroModel.update({nombre_lugar_registro},{where:{id_lugar_registro}})
            //Si todo sale correcto retornara mensaje de exito
            res.json("Actualizado Con Exito")
        } catch (error) {
            //En dado caso de que falle enviara estado 400 y su respectivo mensaje de error
            res.status(400).json(error.message)
        }
    },

    //Metodo usado para deshabilitar un lugar de registro, esta deshabilitacion lo quita de varias secciones del sistema
    disable:async(req,res)=>{
        //Obtenemos el id del lugar que se quiere inhabilitar
        const {id_lugar_registro} = req.query

        //Usamos el metodo update para cambiar el estado del registro a 0 donde el id corresponda al enviado en la consulta
        await LugarRegistroModel.update({estado:0},{where:{id_lugar_registro}})
        //Respuesta de desactivado con exito
        res.json("Inactivado Con Exito")
    },

    //Metodo usado para habilitar un lugar de registro que antes fue inhabilitado
    enable:async(req,res)=>{
        //Obtenemos el id del lugar que se quiere habilitar
        const {id_lugar_registro} = req.query

        //Usamos el metodo update para cambiar el estado a 1 (Activo) donde el id corresponda al enviado en la consulta 
        await LugarRegistroModel.update({estado:1},{where:{id_lugar_registro}})
        //Respuesta de procedimiento realizado con exito
        res.json("Activado Con Exito")
    }

}

//Exportamos el controlador para hacer uso de este en el archivo respectivo de router
module.exports = LugarRegistroController