/* Archivo que contiene el controlador de usuarios, donde se realizan todos los procesos de gestion de usuarios */

//Importamos el modelo de lugar de registro para hacer uso de este en el archivo
const LugarRegistroModel = require("../database/models/LugarRegistroModel")

//Importamos el modelo de usuario
const UsuarioModel = require("../database/models/UsuarioModel")

//Importamos los helpers de paginacion
const { getPagination, getPagingData } = require("../helpers/paginationHelper")

//Importamos el objeto Op de sequelize (Op=operador)
const { Op } = require("sequelize")

//Importamos el modelo de codigo de descuento
const CodigoDescuentoModel = require("../database/models/CodigoDescuentoModel")


//Definimos el controlador, el cual va a tener los metodos de gestion de informacion
const UsuarioController = {

    //Definimos el metodo getAll el cual permitira la obtencion de todos los registros de usuarios 
    getAll: async(req,res) =>{

        //Obtenemos de la consulta las variables de page, size y estado del codigo... para realizar el respectivo filtrado de la informacion
        let { page, size, state_cod} = req.query;

        //Obtenemos el limite y el inicio del metodo de getPagination, donde enviamos como parametros la pagina y el tamaño
        const { limit, offset } = getPagination(page, size);

        //si el codigo no es ni 1, ni 0 va a definir el estado del codigo como un arreglo con 1 y 0 para traer todoslos registros
        if(state_cod!=='0' && state_cod!=='1'){
            state_cod=[0,1]
        }

        //Definimos usuarios como el resultado de la consulta de findAndCountAll del modelo de usuario
        //Como parametros enviamos el orden, el limite, el salto, y los modelos que incluye
        const usuarios = await UsuarioModel.findAndCountAll({
            //El orden es decendente desde la fecha de creacion
            order:[['createdAt', 'DESC']],
            //El limite es la variable anterior mente definida
            limit,
            //El salto es la variable enterior mente definida
            offset,
            //Para incluir varios modelos usamos un arreglo de objetos
            include:[
                //Cada objeto tiene el modelo al que se hace referencia y sus atributos
                {model:LugarRegistroModel, attributes:["id_lugar_registro", "nombre_lugar_registro"]},
                {
                    model:CodigoDescuentoModel, 
                    attributes:["estado"],
                    //En este caso se adjunta una condicion para traer segun el estado de codigo
                    where:{ estado: state_cod}
                }
            ],
        })

        //Definimos una respuesta como el resultado del metodo getPagingData, el cual es un objeto ordenado de los resultados de usuarios
        const respuesta = getPagingData(usuarios, page, limit)

        //Se envia como respuesta el objeto obtenido anterior mente
        res.json(respuesta)
    },

    //Obtener los usuarios filtrando segun un campo en especifico
    getFiltered: async(req,res) =>{
        //creamos una funcion para retornar que metodo se debe ejecutar segun corresponda
        //Como parametros solicita un metodo
        const getMethod = (method)=>{
            //Un swich para validar que valor tiene el campo method y segun este ejecutar una seccion de codigo
            switch (method) {
                //En dado caso que el valor sea igual a "eq"
                case "eq":
                    //Va a retornar Op.eq
                    //Esto significa que el operador de consulta va a ser "igual" (=)
                    return Op.eq
                
                //En dado caso que el valor sea igual a "ne"
                case "ne":
                    //Va a retornar Op.ne
                    //Esto significa que el operador de consulta va a ser "diferente" (!=)
                    return Op.ne

                //En dado caso que el valor sea igual a "substring"
                case "substring":
                    //Va a retornar Op.substring
                    //Esto significa que el operador de consulta va a ser "contiene" (like)
                    return Op.substring
            
                //Si no coincide con las opciones anteriores ejecuta lo siguiente
                default:
                    //Va a retornar Op.eq
                    //Esto significa que el operador de consulta va a ser "igual" (=)
                    return Op.eq
            }
        }

        //Obtenemos los campos de la consulta con su respectivo valor
        let { atribute, value, method, page, size, state_cod } = req.query;

        //Obtenemos el limit y offset del metodo de getPagination enviando como parametros la pagina y el tamaño
        const { limit, offset } = getPagination(page, size);

        //Si el estado del codigo no es 1 o 0 ejecute la siguiente linea de codigo
        if(state_cod!=='0' && state_cod!=='1'){
            //Va a definir como un arreglo que contiene 1 o 0 asi traer todos los resultados
            state_cod=[0,1]
        }

        //Definimos una constante denominada usarios que tendra el resultado de la consulta al modelo (findAndCountAll)
        //Como parametros se envia el limite, el salto, y que modelos incluye
        const usuarios = await UsuarioModel.findAndCountAll({
            //variable que se define antes la cual depende de la pagina
            limit,
            //variable que se define antes la cual depende del tamaño
            offset,
            //Que modelos incluye esta consulta
            include:[
                //Aqui decimos que la consulta incluye el modelo de lugar de registro, donde solo trae los campos de id y nombre
                {model:LugarRegistroModel, attributes:["id_lugar_registro", "nombre_lugar_registro"]},
                //Aqui incluye el modelo de codigo de descuento donde incluye el estado del codigo y con la condigion de que el estado del codigo coinsida con el de la consulta
                {model:CodigoDescuentoModel, attributes:["estado"], where:{ estado: state_cod}}
            ],
            //Condicion para filtrar los campos
            where:{
                //Donde el atributo sea igual al que se trae en la consulta
                //El metodo coincida con el del metodo de switch
                //Y el valor respectivo que entra en la consulta
                [atribute]:{[getMethod(method)]:value}
            },
            //Definimos el orden de la consulta como decendente en el campo de fecha
            order:[['createdAt', 'DESC']]
        })

        //Organizamos la respuesta con el objeto de paginacion
        const respuesta = getPagingData(usuarios, page, limit)

        //Enviamos la respuesta en tipo Json
        res.json(respuesta)
    },

    //Funcion que traera los registros de usuarios filtrando por un rango fechas 
    filterByDateRange: async(req,res) =>{
        //Traemos las variables que fueron definidas en la consulta
        let { fechaInicio, fechaFin, campo, page, size, state_cod} = req.query

        //Traemos el limite y el salto de la funcion de getPagination, enviando como argumentos la pagina y el tamaño
        const { limit, offset } = getPagination(page, size);

        //Si el estado del codigo no es 1 o 0 ejecute la siguiente linea de codigo
        if(state_cod!=='0' && state_cod!=='1'){
            //Va a definir como un arreglo que contiene 1 o 0 asi traer todos los resultados
            state_cod=[0,1]
        }

        //Traemos los registros de los usuarios usando el metodo de findAndCountAll
        //Como parametros enviamos los modelos que se incluyen, la condicion de filtrado, el limite, el orden y el salto
        const usuarios = await UsuarioModel.findAndCountAll({

            //Definimos los modelos que se van a incluir en la consulta
            include:[
                //Aqui decimos que la consulta incluye el modelo de lugar de registro, donde solo trae los campos de id y nombre
                {model:LugarRegistroModel, attributes:["id_lugar_registro", "nombre_lugar_registro"]},
                //Aqui incluye el modelo de codigo de descuento donde incluye el estado del codigo y con la condigion de que el estado del codigo coinsida con el de la consulta
                {model:CodigoDescuentoModel, attributes:["estado"], where:{ estado: state_cod}}
            ],
            //Establecemos las condiciones de la consulta
            where:{
                //donde el campo sea igual al campo que se envai en la consulta
                //y las fechas se encuentren entre la fecha inicio de la consulta y la fecah fin de la consulta
                [campo]:{ [Op.between]:[fechaInicio,fechaFin] }
            },
            //
            //variable que se define antes la cual depende de la pagina
            limit,
            //variable que se define antes la cual depende del tamaño
            offset,
            //Definimos el orden de la consulta como decendente en el campo de fecha
            order:[['createdAt', 'DESC']]
        })
        //Organizamos la respuesta con el objeto de paginacion
        const respuesta = getPagingData(usuarios, page, limit)

        //Enviamos la respuesta en tipo Json
        res.json(respuesta)
    },

    //Metodo encargado de actualizar la informacion de cada uno de los registros
    update: async(req,res) =>{
        //Obtenemos el id del usuario en la consulta
        const { id_usuario } = req.query
        //Del cuepo de la consulta obtenemos los datos basicos de usuario a actualizar
        const { 
        nombres,
        apellidos,
        correo_electronico,
        fecha_nacimiento,
        telefono_contacto,
        numero_doc,
        lugar_registro_fk } = req.body
        
        //Bloque try-catch para ejecutar una determinada accion en dado caso de que algo falle (puede fallar a causa de duplicidad de datos)
        try {

            //Usamos el metodo update del modelo de usuario
            await UsuarioModel.update(
                //Pasamos los campos que se quieren actualizar, cada campo toma el valor de su similar en la consulta
                {
                nombres,
                apellidos,
                correo_electronico,
                fecha_nacimiento,
                telefono_contacto,
                numero_doc,
                lugar_registro_fk
            },
            {
                //Condicional que nos indica donde es que queremos actualizar
                where:{id_usuario}
            }
            )
            
            //Si todo sale de manera adecuada retornara mensage de exito
            res.json(`Usuario actualizado`)
        } catch (error) {
            //En dado caso que falle algo al actualizar retornara objeto de error con el respectivo error
            res.json({error:error.message})   
        }
            
        } ,

    //Esta funcion se encarga de borrar un registro de manera permanente de la base de datos
    delete: async(req,res)=>{
        //Obtenemos el id del usuario que se quiere eliminar mediante la consulta
        const { id_usuario } = req.query

        //Obtenemos el estado del codigo de descuento del usuario que se quiere eliminar
        const {estado} = await CodigoDescuentoModel.findOne({where:{usuario_fk:id_usuario}})

        //Si este estado es 1 o "Canjeado"
        if(estado)
            //Respondera con mensaje de que es imposible eliminar este registro a causa de que el usuario ya canjeo el codigo
            res.json("No se puede eliminar a un usuario que ya a canjeado el codigo")
        else{
            //Si no, eliminara el registro donde el id corresponda al solicitado
            await UsuarioModel.destroy({where:{id_usuario}})
            //Despues respondera con mensaje de usaurio borrado con exito
            res.json("Usuario Borrado")
        }

    }

}

//Exportamos el controlador para hacer uso de este en los router
module.exports = UsuarioController