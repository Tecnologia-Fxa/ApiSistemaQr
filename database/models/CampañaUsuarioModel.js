/* Mapeo de la tabla que va a almacenar la relacion entre campaña y usuario */

// Como en todas que se estan mapeando se requiere importar la superclase Model
// Model tiene la respectiva configuración para realizar el mapeo a las tablas de la BD
// DataTypes Solo contiene la información de los tipos de datos disponibles, para crear restriccion y evitar mal ingreso de la información a la BD
//? DataTypes no asegura por si solo el correcto ingreso de información a la BD
const { Model, DataTypes} = require('sequelize');

//Importamos la conexion a la BD 
const sequelize = require('../ConfigBD');

//Creamos una clase que hereda todos los atributos de la superclase Model
class CampañaUsuarioModel extends Model {};

//Usamos el metodo init para realizar el respectivo mapeo de la tabla
CampañaUsuarioModel.init({
    //Como se ha mencionado antes para el mapeo la función solicita pasar como argumentos los campos que se requieren en la tabla

    //llave primaria y foranea de la tabla para crear una relacion en ambas tablas
    usuario_fk:{
        //Como es un ID sera de tipo entero(INTEGER)
        type: DataTypes.INTEGER,
        //Establecemos que este campo sera llave primaria de la tabla 
        primaryKey: true,
    },
    
    //llave primaria y foranea de la tabla para crear una relacion en ambas tablas
    campaña_fk:{
        //Como es un ID sera de tipo entero(INTEGER)
        type: DataTypes.INTEGER,
        //Establecemos que este campo sera llave primaria de la tabla 
        primaryKey: true,
    },

},{
    //Importamos la conexion a la base de datos
    sequelize,
    //Nombre de la tabla
    modelName: 'campaña_usuario',
    //Establecemos los timestam,p como falso para que no nos genere campo de actualizacion y creacion de registro
    timestamps:false,
    //Congelamos el nombre de la tabla para que no hayan cambios en la estructura de la bd con el tema de las s
    freezeTableName: true
});

//Exportamos el modulo para usarlo en nuestro sistema
module.exports = CampañaUsuarioModel