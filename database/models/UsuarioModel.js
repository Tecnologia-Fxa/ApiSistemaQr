/* Mapeo de la tabla que va a almacenar toda la información de los usuarios */

// Como en todas que se estan mapeando se requiere importar la superclase Model
// Model tiene la respectiva configuración para realizar el mapeo a las tablas de la BD
// DataTypes Solo contiene la información de los tipos de datos disponibles, para crear restriccion y evitar mal ingreso de la información a la BD
//? DataTypes no asegura por si solo el correcto ingreso de información a la BD
const { Model, DataTypes} = require('sequelize');

//Importamos la conexion a la BD 
const sequelize = require('../ConfigBD');

//Creamos una clase que hereda todos los atributos de la superclase Model
class UsuarioModel extends Model {};

//Usamos el metodo init para realizar el respectivo mapeo de la tabla
UsuarioModel.init({
    //Como se ha mencionado antes para el mapeo la función solicita pasar como argumentos los campos que se requieren en la tabla

    //El primer campo requerido es el id
    //Ya que se necesita un identificador para gestionar la información de manera mas optima
    id_usuario:{
        //Como es un ID sera de tipo entero(INTEGER)
        type: DataTypes.INTEGER,
        //Establecemos que este campo sera llave primaria de la tabla 
        primaryKey: true,
        //Se define que tendra un auto incremento segun el número de registro que se esté ingresando
        autoIncrement: true
    },

    //El siguiente campo a definir son los nombres
    nombres:{
        //Tipo de dato es texto con limite de 30 caracteres
        type: DataTypes.STRING(30),
        //Campo obligatorio
        allowNull: false
    },

    //El siguiente es apellidos que tiene la misma logica de nombres
    apellidos:{
        type: DataTypes.STRING(30),
        allowNull:false
    },

    //Proximo campo es el correo electronico del usuario
    correo_electronico:{
        //Tipo de dato es texto con maximo de caracteres aceptado 75
        type: DataTypes.STRING(75),
        //Es un campo obligatorio
        allowNull:false,
        //Campo obligatorio
        unique:{
            //En caso de que se intente registrar otro correo el sistema devolvera el siguiente mensaje de error
            msg: 'Correo electronico ya registrado en el sistema'
        }
    },

    //Siguiente campo almacenara la fecha en la que nacio el usuario
    fecha_nacimiento:{
        //Tipo de dato solo fecha para evitar errores con la hora
        type: DataTypes.DATEONLY,
        //Campo obligatorio
        allowNull:false
    },

    //Campo que almacena el número de telefono de contacto del usuario
    //Este es el número al que se le va a enviar el codigo de descuento
    telefono_contacto:{
        //Tipo de dato tecto ya que no se haran operaciones matematicas con este número
        type: DataTypes.STRING(30),
        //Campo obligatorio
        allowNull:false,
        //Campo unico
        unique:{
            //En caso de que se intente agregar un telefono que ya se encuentre registrado, el sistema devolvera el siguiente mensaje de error
            msg: 'Número de télefono ya registrado en el sistema'
        }
    },

    //Campo que almacenara el número de documento del usuario que se registra 
    numero_doc:{
        //Tipo de dato tecto ya que no se haran operaciones matematicas con este número
        type: DataTypes.STRING(25),
        //Campo obligatorio
        allowNull:false,
        //Campo unico
        unique:{
            //En caso de que se intente agregar un telefono que ya se encuentre registrado, el sistema devolvera el siguiente mensaje de error
            msg: 'Número de documento ya registrado en el sistema'
        }
    },

    //Campo que almacena la foranea a la tabla que tiene los lugares de registro
    lugar_registro_fk:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    
    createdAt: { type: DataTypes.DATEONLY },
    updatedAt: { type: DataTypes.DATEONLY }

},{
    //Importamos la conexion a la base de datos
    sequelize,
    //Nombre de la tabla
    modelName: 'usuario',
    //Congelamos el nombre de la tabla para que no hayan cambios en la estructura de la bd con el tema de las s
    freezeTableName: true
});

//Exportamos el modulo para usarlo en nuestro sistema
module.exports = UsuarioModel