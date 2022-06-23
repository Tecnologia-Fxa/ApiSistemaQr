/* Aechivo que contiene los metodos crrespondientes al contador de visitas */

//Importamos el orm para hacer uso de una funcion en especifico
const sequelize = require("../database/ConfigBD")

//Importamos el modelo de viewsCounter 
const ViewsCounterModel = require("../database/models/ViewsCounterModel")

//Creamos un objeto que va a tener todos las funciones que se van a usar 
const ViewsCounterController = {

    //Metodo que va a incrementar en 1 los registros en la bd de una determinada pagina
    newVisit:async(req,res)=>{
        //Traemos del cuerpo de la consulta el campo page con su valor
        const {page} = req.query
        //Ejecutamos de manera asincrona el siguiente preoceso en la bd mediante el uso de el metodo query de seuqelize
        //El siguiente metodo inserta si el nombre de pagina no existe, pero si existe lo que hara sera sumar en 1 el valor del access_counter
        await sequelize.query(`INSERT INTO views_counter (access_page, access_counter) VALUES ('${page}', 1) ON DUPLICATE KEY UPDATE access_counter = access_counter + 1`)
        //Terminado el proceso anterior retornara mensaje de visita registrada
        res.json("visita registrada")
    },

    //Metodo que traera el total de registros segun el nombre de la pagina
    getPageVisits:async(req,res)=>{
        //Traemos del cuerpo de la consulta el campo page con su valor
        const {page} = req.query
        //Definimos una constante que tendra como valor el resultado de ejecutar el metodo findAll del modelo del contador de visitas, pasando como condicion de busqueda el nombre de pagina
        const pageVisits = await ViewsCounterModel.findAll({where:{access_page:page}})
        //Retornamos el total de estas visitas
        res.json(pageVisits[0])
    }
}

//Exportamos el controlador para hacer uso de este en los archivos de router denominados con el mismo nombre
module.exports = {ViewsCounterController}