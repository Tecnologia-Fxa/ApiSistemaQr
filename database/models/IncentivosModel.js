/* Mapeo de la tabla que va a almacenar las estratejias de objetivos por lugar de registro */

// Como en todas que se estan mapeando se requiere importar la superclase Model
// Model tiene la respectiva configuración para realizar el mapeo a las tablas de la BD
// DataTypes Solo contiene la información de los tipos de datos disponibles, para crear restriccion y evitar mal ingreso de la información a la BD
//? DataTypes no asegura por si solo el correcto ingreso de información a la BD
const { Model, DataTypes} = require('sequelize');

//Importamos la conexion a la BD 
const sequelize = require('../ConfigBD');

//Creamos una clase que hereda todos los atributos de la superclase Model
class IncentivosModel extends Model {};

//Usamos el metodo init para realizar el respectivo mapeo de la tabla
IncentivosModel.init({
    //Como se ha mencionado antes para el mapeo la función solicita pasar como argumentos los campos que se requieren en la tabla

    //El primer campo requerido es el id
    //Ya que se necesita un identificador para gestionar la información de manera mas optima
    id_incentivo:{
        //Como es un ID sera de tipo entero(INTEGER)
        type: DataTypes.INTEGER,
        //Establecemos que este campo sera llave primaria de la tabla 
        primaryKey: true,
        //Se define que tendra un auto incremento segun el número de registro que se esté ingresando
        autoIncrement: true
    },

    //campo que almacenara la meta del incentivo
    meta_incentivo:{
        //Tipo de dato entero
        type:DataTypes.INTEGER,
        //Campo obligatorio
        allowNull:false,
    },

    //campo que almacenara la fecha de inicio en la que empieza la validacion de la meta de incentivos
    fecha_inicio:{
        //Tipo de dato fecha, es date only ya que no permite la hora
        type:DataTypes.DATEONLY,
        //Campo obligatorio
        allowNull:false
    },

    //Fecha en la cual termina la validacion de incentivos
    fecha_corte:{
        //Tipo de dato fecha, es date only ya que no permite la hora
        type:DataTypes.DATEONLY,
        //Campo obligatorio
        allowNull:false
    },

    //campo que almacenara la meta del incentivo
    lugar_registro_fk:{
        //Tipo de dato entero
        type:DataTypes.INTEGER,
        //Campo obligatorio
        allowNull:false,
    }

},{
    //Importamos la conexion a la base de datos
    sequelize,
    //Nombre de la tabla
    modelName: 'incentivo',
    //Establecemos los timestam,p como falso para que no nos genere campo de actualizacion y creacion de registro
    timestamps:false,
    //Congelamos el nombre de la tabla para que no hayan cambios en la estructura de la bd con el tema de las s
    freezeTableName: true
});

//Exportamos el modulo para usarlo en nuestro sistema
module.exports = IncentivosModel