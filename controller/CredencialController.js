/* Archivo que contiene el controlador de credencial */

//Importamos el modelo de credencial
const CredencialModel = require("../database/models/CredencialModel")

//Importamos bcrypt el cual es una libreriade encriptacion y desencriptacion
const bcrypt = require("bcrypt")

//IMportamos el validador de express-validator
const { validationResult } = require("express-validator")

//Importamos jwt el cual es una libreria para el manejo de tokens
const jwt = require('jwt-simple')

//Importamos las variables de entorno del sistema
require ('dotenv').config();

//Importamos la libreria moment que falicita la gestion de tiempo
const moment = require('moment');

//Definimos un metodo el cual va a crear y retornar el token de acceso al sistema
//Como parametros ponemos el rol y el id de la sesion 
const tokenAcceso = (rol, id_rol) =>{
    //Definimos un objeto el cual contendra la estructura que deseamos codificar
    let payload ={
        //El rol que solicitamos como parametro
        rol,
        //El id que se solicito como parametro
        id_rol,
        //La fecha y hora en la que se creo el token
        createAt: moment().unix(),
        //La fecha y hora en la que se creo el token agregando 90 minutos
        expiredAt: moment().add(90,'minutes').unix()
    }

    //Retornamos la codificacion del item anterior con la frace secreta que se encuentra en las variables del api
    return jwt.encode(payload, process.env.PASSDECODE)
}

//Creamos el controlador de credencial el cual contendra los metodos requeridos
const CredencialController = {

    //Metodo que retorna el token de acceso al api
    logIn:async(req,res)=>{
        //Del cuerpo de la consulta traemos el usuario y la contraseña que se van a comparar
        const { nombre_usuario, contraseña } = req.body

        //Validamos que estos datos coincidan con una logica basica (minimo que si se hayan declarado)
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({ errors:errors.array() })
        }

        //Definimos como usuario el resultado de encontrar en el modelo de credencial
        const user = await CredencialModel.findOne({where:{nombre_usuario}})
        //Si la consulta anterior si encontro un resultado ejecute lo siguiente
        if(user){
            //Compare si la contraseña es igual a la registrada en la abse de datos, pero como la contraseña de la base de datos esta encriptada es necesario compararlas con el metodo de bcrypt
            let log = bcrypt.compareSync(contraseña, user.contraseña)
            //Si las comparacion anterior fue verdadera
            if(log)
                //Responda con el token de acceso que se crea con el metodo definido anterior mente
                //pasamos como argumentos el nombre de usuario(Rol) y el id de la credencial
                res.json(tokenAcceso(user.nombre_usuario, user.id_credencial))
            else{
                //En dado caso de que la contraseña no sea la misma que la almacenada en la bd va a retornar mensaje de error
                res.status(400).json("Error usuario y/o contraseña incorrectos")     
            } 
        }else
            //En dado caso que no se encuentre el usaurio en la bd va a retornar mensaje de error
            res.status(400).json("Error usuario y/o contraseña incorrectos")
    },

    //Metodo de emergencia en dado caso que se olvide la contraseña del administrador
    //Para usarlo es necesario que no existan las credenciales en la base de datos
    createCredencials: async(_req,res)=>{
        //Se obtienen todas las credenciales que se encuentren en la base de datos
        const credenciales = await CredencialModel.findAll()

        //Si encuentra alguna credencial retorna mensaje de que las credencailes ya fueron creadas
        if(credenciales[0])
            res.json("Las credenciales ya han sido creadas")
        else{
            //si no va a encriptar el siguiente texto un total de 13 veces
            const pass = bcrypt.hashSync("FxaPassword", 13)
            //Y va a crear para cada uno de los roles un usuario con la misma contraseña definida anterior mente
            const admin = await CredencialModel.create({nombre_usuario:"Admin",contraseña:pass})
            const analista = await CredencialModel.create({nombre_usuario:"Analista",contraseña:pass})
            const tecnologia = await CredencialModel.create({nombre_usuario:"Tecnologia",contraseña:pass})
            //Al final retorna que se crearon cada uno de los roles
            res.json(`Se han Creado Las Credenciales para los usuarios ${admin.nombre_usuario}, ${analista.nombre_usuario} y ${tecnologia.nombre_usuario}`)
        }

    },

    //Metodo que se encarga de cambiar la contraseña a una determinada credencial
    changePassCredential:async(req,res)=>{
        //De la consulta obtenemos la contraseña actual del admin, el nombre de usuario al que se le va a cambiar la contraseña, y la nueva contraseña para este rol
        let { contraseña, nombre_usuario, nueva_contraseña} = req.body

        //Obtenemos la contraseña registrada en la base de datos del administrador
        const passAdmin = await CredencialModel.findOne({where:{nombre_usuario:"Admin"}})

        //Validamos que la contraseña se haya pasado correctamente por los parametros
        if(!nueva_contraseña)
            //En caso de que no este con algun valor respondemos con mensaje de error
            res.json("Nueva contraseña no esta definida")
        else{
            //En dado caso que si este definida

            //Comparamos que la contraseña del administrador coincida con la contraseña registrada en la base de datos
            //Se usa el metodo compareSync para validar la contraseña encriptada con la registrada en la consulta
            const validatePass = bcrypt.compareSync(contraseña,passAdmin.contraseña)
            
            //En dado caso que las contraseñas no hayan coincidido
            if(!validatePass)
                //Respondera con mensaje de contraseña de admin erronea
                res.json("Contraseña Admin Erronea")
            else{
                //Si las contraseñas si coinciden
                //Va a encriptar la nueva contraseña de la consulta
                nueva_contraseña = bcrypt.hashSync(nueva_contraseña, 13)
                //Y va a actualizar la contraseña del rol definido anterior mente con la nueva encriptada
                await CredencialModel.update({contraseña:nueva_contraseña},{where:{nombre_usuario}})
                //Si todo sale bien responde con mensaje de exito
                res.json("Contraseña Actualizada")
            }
        }
    }

}

//Exportamos el controlador para que este sea usado en los routers
module.exports = CredencialController