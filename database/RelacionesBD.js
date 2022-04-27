/*Este archivo contiene las relaciones de las tablas, todo esto para obtener la infornmación de una manera mas optima*/


//Primero importamos todas las tablas, para poder hacer uso de estas mas adelante en el codigo

//Estas tablas estan creadas en la ruta de Database/Models/"Nombre Modelo"
const CodigoDescuentoModel = require("./models/CodigoDescuentoModel");
const LugarRegistroModel = require("./models/LugarRegistroModel");
const UsuarioModel = require("./models/UsuarioModel");
//TODO:BORRAR
//!BORRAR
require("./models/CredencialModel");


//!-------------------------------------------------------------------------------------------------

//Relaciones 1 a 1
//?1 a 1 significa que un registro esta estrictamente relacionado con solo 1 registro de otra tabla
//*Ejemplo: 1 conductor solo tiene asignado 1 bus, 1 usuario solo tiene asignado un equipo de computo

//relacion usuario y codigo descuento
//*Un usuario tiene unicamente asignada una codigo de descuento 
//Le asignamos la relacion de codigo descuento a usuario
UsuarioModel.hasOne(CodigoDescuentoModel, { foreignKey: 'usuario_fk' });
//Le asignamos la relación de usuario a codigo de descuento, indicamos que la llave foranea de la relación está en la tabla codigo de descuento y se llama usuario_fk
CodigoDescuentoModel.belongsTo(UsuarioModel, { foreignKey: 'usuario_fk' })

//!-------------------------------------------------------------------------------------------------

//Relaciones 1 a M 
//?1 a M significa que un registro puede tener asociados 1 o mas registros de otra tabla
//*Ejemplo: 1 maestro tiene muchos alumnos, pero 1 alumno solo tiene un maestro; 1 camarero atiende muchos comensales, pero 1 comensal solo es atendido por 1 camarero


//Relacion lugar_registro y usuario (foranea en usuario)
//*1 lugar de registro tiene asociados muchos usuarios, pero 1 usuario solo puede tener un lugar de registro
//Creamos la relación en el modelo LugarRegistroModel donde le damos un alias a la relación 
LugarRegistroModel.hasMany(UsuarioModel, { as:'usuario', foreignKey:'lugar_registro_fk' });
//Creamos la relación en la tabla de usuario estableciendo como se llamara la foranea de la relación lugar_registro_fk
UsuarioModel.belongsTo(LugarRegistroModel, { foreignKey:'lugar_registro_fk' })






