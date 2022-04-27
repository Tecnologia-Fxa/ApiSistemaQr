//Archivo de configuración basica de la base de datos

//Importamos la libreria de Sequelize
//Sequelize es un ORM que nos permitira un facil mapeo y gestion de la información de la base de datos
const { Sequelize } = require("sequelize");

//Llamamos nuestras variables de entorno
require ('dotenv').config();

//creamos un objeto llamado sequelize que se basa en la estructura de Sequelize
//Sequelize recibe como parametros el nombre de la base de datos, el usuario, la contraseña y un objeto que contiene el host donde esta almacenada y el dialecto de la base de datos
const sequelize = new Sequelize(
    //Para obtener cada una de las variables de entorno se usa el objeto process.env despues se pone el nombre de la variable
    process.env.DATABASE,
    process.env.USERDATABASE,
    process.env.PASSDATABASE,
    {
        host: process.env.HOSTDATABASE,
        dialect: process.env.DIALECTDATABASE
    }
);

//Por ultimo Exportamos el objeto sequelize para usarlo cda que se llama este archivo
module.exports = sequelize;