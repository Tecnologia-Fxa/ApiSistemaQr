/**
 * Para crear un proyecto en node es necesario inicializarlo,
 * para esto usamos el comando init desde npm o yarn
 * ! En este caso se uso yarn init
 * 
 * Al inicializarlo se preguntara:
 * ? Cual sera el nombre del proyecto? //! En este caso se dejo el nombre por defecto
 * ? Cual sera la versión del proyecto //! Se deja la versión por defecto
 * ? Una descripción para el proyecto //!  Se realiza breve descripción de la api
 * ? Cual es el archivo principal donde se ejecuta el proyecto? //! Se deja por defecto (index.js)
 * ? Cual es la Url del repocitorio donde se encontrara el archivo? //! En un inicio se deja en blanco
 * ? Cual es el autor? //! Se deja el autor por defecto
 * ? Cual licencia tendra el proyecto? //! Se deja la licencia por defecto (MIT)
 * ? El proyecto es privado? //! Se deja vacio para decir que no es privado
 * 
 * Despues de responder estas preguntas se creara automaticamente el archivo denominado package.json
 * el cual contendra la información del proyecto las dependencias utilizadas y los comandos de desarrollo y producción
 */

/**
 * *De misma manera si se desea importar el codigo desde el repositorio de git
 * *se debe descargar el codigo ya sea el archivo rar o con clone
 * *despues usar el comando init, el cual desccargara todas las dependencias necesarias para ejecutar el proyecto
 */

//?----------------------------------------------------------------------------------------------------------------
//Index.js es el archivo principal del API donde ejecutamos nuestro servidor y definimos los metodos que se van a usar


//Improtamos la libreria de express que nos permitira ejecutar el servidor y hacer uso de este
const express = require('express');
//Definimos una constante que va a tener todos los metodos relacionados a nuestro servidor (todo esto lo obtiene de la libreria express) 
const app = express();


//Importamos nuestro documento de variables de entorno
//Para esto usamos una libreria que nos facilita el trabajo llamada dotenv
//El archivo donde se encuentran las variables de entorno es ".env"
require ('dotenv').config();

//Definimos una constante que tendra todas las configuraciónes de nuestra base de datos
//Como se puede observar hace referencia al archivo que esta en la carpeta database y se llama configBD 
const sequelize = require('./database/ConfigBD');

//Definimos el puerto donde se va a ejecutar nuestro servidor
//Tomamos el puerto desde las variables de entorno
//En caso de que no encuentre la variable de entorno el puerto por defecto es el 3003
const PORT = process.env.PORT || 3003;

//Importamos el archivo de relacionesBD que contiene todas las tablas y la relacion de estas
//Al solo poner el require con la ruta que se va a usar, Javascript ejecuta todas las lineas de ese archivo 
require('./database/RelacionesBD')

//El siguiente fragmento de codigo es necesario para poder recibir parametros por el cuerpo de la consulta
//!Estos datos deben ser tipo JSON
/**
 * *Ejemplo:
 * ? body:{
 * ?    nombre:"Pepe",
 * ?    apellidos:"Perez",
 * ?    edad:19
 * ? }
 */
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

//El siguiente fragmento de codigo evita el error de cors
//El error de cors se da porque los headers bloquean el flujo de la información por seguridad
const cors = require('cors')
app.use(cors())

//Acontinuacion la sección que redirecciona cuando la busqueda sea /api-qr-code
//Cuando se entra al sistema
app.use('/api-qr-code', require('./router/router'))

//La siguente seccion de codigo se usa para inicializar el servidor
//como primer parametro se le pasa el puerto en el que se va a esjecutar el servidor
//como segundo parametro una funcion la cual vaa mostrar en consola en que puerto se arranco el servidor
app.listen(PORT, () =>{
    console.log(`El proyecto a sido arrancado en el puerto:${PORT}`);

    //Inicializamos el mapeo a la base de datos, donde le decimos que no actualice la informacion
    sequelize.sync( {force: false} ).then(()=>{
        //Si todo sale bien muestra que la conexion fue exitosa
        console.log('Conexion a la bd exitosa');
    }).catch(error=>{
        //Si algo sale mal muestra error y descripcion de este error
        console.log('Error al conectar la bd: ' + error)
    });
});