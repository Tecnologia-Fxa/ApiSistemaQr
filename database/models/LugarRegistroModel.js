/* Mapeo de la tabla que va a almacenar los lugares donde se registran los usuarios (tiendas) */

// Como en todas que se estan mapeando se requiere importar la superclase Model
// Model tiene la respectiva configuración para realizar el mapeo a las tablas de la BD
// DataTypes Solo contiene la información de los tipos de datos disponibles, para crear restriccion y evitar mal ingreso de la información a la BD
//? DataTypes no asegura por si solo el correcto ingreso de información a la BD
const { Model, DataTypes} = require('sequelize');

//Importamos la conexion a la BD 
const sequelize = require('../ConfigBD');

//Creamos una clase que hereda todos los atributos de la superclase Model
class LugarRegistroModel extends Model {};

//Usamos el metodo init para realizar el respectivo mapeo de la tabla
LugarRegistroModel.init({
    //Como se ha mencionado antes para el mapeo la función solicita pasar como argumentos los campos que se requieren en la tabla

    //El primer campo requerido es el id
    //Ya que se necesita un identificador para gestionar la información de manera mas optima
    id_lugar_registro:{
        //Como es un ID sera de tipo entero(INTEGER)
        type: DataTypes.INTEGER,
        //Establecemos que este campo sera llave primaria de la tabla 
        primaryKey: true,
        //Se define que tendra un auto incremento segun el número de registro que se esté ingresando
        autoIncrement: true
    },

    //campo que almacenara el nombre del lugar de registro
    nombre_lugar_registro:{
        //Tipo de dato string con un maximo de caracteres de 35
        type:DataTypes.STRING(35),
        //Campo obligatorio
        allowNull:false,
        //Campo unico
        unique:true
    },

    //Campo que almacena el estado del lugar de registro, para decir si esta activo = funcionando o inactivo para no mostrarlo en el formulario
    estado:{
        //Tipo de dato es booleano, para ahorrar espacio en la bd
        type:DataTypes.BOOLEAN,
        //Por defecto cada codico creado tendra como valor 1 = "activo"
        defaultValue:1
    }

},{
    //Importamos la conexion a la base de datos
    sequelize,
    //Nombre de la tabla
    modelName: 'lugar_registro',
    //Establecemos los timestam,p como falso para que no nos genere campo de actualizacion y creacion de registro
    timestamps:false,
    //Congelamos el nombre de la tabla para que no hayan cambios en la estructura de la bd con el tema de las s
    freezeTableName: true
});

//Exportamos el modulo para usarlo en nuestro sistema
module.exports = LugarRegistroModel