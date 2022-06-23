/* Aechivo que contiene el controlador del dashboard */

//Importamos sequelize, para usar el metodo de ejecutar una consulta directa a la bd
const sequelize = require("../database/ConfigBD")

//Importamos el modelo de codigo de descuento
const CodigoDescuentoModel = require("../database/models/CodigoDescuentoModel")

//Importamos el modelo de usuario
const UsuarioModel = require("../database/models/UsuarioModel")

//Creamos el controlador del dashboard El cual contendra todas las funciones que seran llamadas en el repectivo router
const DashBoardDataController = {

    //Funcion que traera el contenido de las cartas basicas que se visualizan en el dash board del front
    getDataCartas: async(_req,res)=>{

        //?-----Consulta Tarjeta totales
        //consultamos la cantidad todal de usuarios
        const cantidadTotal = await UsuarioModel.count()
        //Consultamos la cantidad total de los usaurios que han canjeado el codigo
        const cantidadCanjeado = await UsuarioModel.count({include:{model:CodigoDescuentoModel,where:{estado:1}}})
        
        //?-----Consulta Tarjeta Cumpleaños
        //Se obtiene el total de cumpleañeros del mes actual con la siguiente consulta a la base de datos
        const cantidadCumpleañerosMes = await sequelize.query('select count(fecha_nacimiento)total from usuario where month(fecha_nacimiento) = month(now())')
        //Se obtiene el total de cumpleañeros del día actual con la siguiente consulta a la base de datos
        const cantidadCumpleañerosDia = await sequelize.query('select count(fecha_nacimiento)total from usuario where month(fecha_nacimiento) = month(now()) and day(fecha_nacimiento) = day(now())')
        //Se guardan los resultados obtenidos antes en un solo elemento
        const cantidadCumpleañeros = {mensual:cantidadCumpleañerosMes[0][0].total,diario:cantidadCumpleañerosDia[0][0].total}

        //Se da respuesta de estos resultados
        res.json({cantidadTotal,cantidadCanjeado, cantidadCumpleañeros})
    },

    //Funcion que retorna la estructura de data requerida para crear la grafica que se visualiza en el dashboard
    getDataConteoMensualLugarRegistro:async(req,res)=>{
        //Traemos la fecha de inicio la fecha de fin y como campo opcional el id del lugar de registro
        const { fecha_inicio, fecha_fin, id_lugar_registro } = req.query

        //Definimos una ariable vacia que contendra o no informacion dependiendo el lugar de registro
        let condicion_lugar = ''
        //El id esta definido
        if(id_lugar_registro){
            //Si el id esta definido va a definir la condicion_lugar, esto para obtener un lugar en especifico
            condicion_lugar += `and lugar_registro_fk = '${id_lugar_registro}'`
        }

        //Bloque try-catch para el manejo de errores
        try{
            //Ejecutamos la consulta donde trae todos los registros segun las fechas dadas
            const resultado = await sequelize.query(`select year(createdAt) año,month(createdAt) mes, count(*) as numRecords from usuario where (createdAt BETWEEN '${fecha_inicio}' AND '${fecha_fin}') ${condicion_lugar} Group By  año, mes`)
            //Definimos los arreglos que van a contener la data
            const meses = []
            const valores = []


            //Definimos las fechas a un formato que el codigo pueda entender de mejor manera para los condicionales
            let mes_fecha_inicio = new Date(`${fecha_inicio}T12:00:00.000Z`).getMonth()+1
            let mes_fecha_fin = new Date(`${fecha_fin}T12:00:00.000Z`).getMonth()+1

            //se define una variable que va a validar el número del mes sea adecuado
            let i 
            //Recorremos el arreglo de resultado 
            resultado[0].forEach((el,id) => {
                //si la pocicion del elemento es 0
                if (id===0){
                    //Mientras que el mes de fecha inicio sea diferente al mes del elemento
                    while(mes_fecha_inicio!==el.mes){
                        //En dado caso que el mes se pase de 12 va a volver a 1
                        if(mes_fecha_inicio===13)
                            mes_fecha_inicio=1
        
                        //En los valores cada vez que haga este ciclo va a pushear el mes, con valor de 0 en la data
                        meses.push(mes_fecha_inicio)
                        valores.push(0)

                        //Incrementa en 1 el mes de inicio cada que realiza el ciclo hasta emparejar con el mes de iniciodel elemento
                        mes_fecha_inicio++
                    }
                    //Se define i como el mes definido en el elemento
                    i=el.mes
                }
                
                //En dado caso que i sea mayor a 12 i va a ser definido como 1
                if(i>12)
                    i=1
                
                //Mientras que i sea diferente a el mes 
                while(i!==el.mes){
                    //Si i es mayor a 12 va a volverlo 1
                    if(i>12)
                        i=1

                    //Va a pushear el numero del mes con valor de 0
                    meses.push(i)
                    valores.push(0)

                    //Incrementa i en 1
                    i++
                }

                //Despues pushea el mes con el valor de registros que tiene el mes
                meses.push(el.mes)
                valores.push(el.numRecords)

                //incrementa i en 1
                i++
            });

            //definimos el final de los meses como el ultimo valor que se encuentra en la cadena de meses
            let mesesFinal = meses[(meses.length)-1]

            //mientras que el mes Final es diferente al mes de la fecha fin
            while(mesesFinal !== mes_fecha_fin){
                //Si se pasa de 12 define el mes como 1
                if(mesesFinal>12)
                    mesesFinal=1

                //Meses Final Tendra un incremento y pusheara valor de 0
                meses.push(mesesFinal)
                valores.push(0)

                //Incremento en 1
                mesesFinal++
            }

            //Se responde con el número de meses y el valor de cada mes
            res.json({meses,valores})
            
        }catch(err){
            //En caso de error respondera con debido mensaje de error
            res.json(err)
        }

    },

    //Funcion que trae como resultado las fechas de cumpleaños de todos los usuarios registrados en el sistema
    getDataAge: async(_req,res)=>{
        //Definimos dataUsuarios como el resultado de el metodo findAll pero solo trayendo como atributos la fecha de cumpleaños
        const dataUsuarios = await UsuarioModel.findAll({attributes:["fecha_nacimiento"]})
        //Respondemos con dataUsuarios en tipo Json
        res.json(dataUsuarios)
    }

}

//Exportamos el controlador para que este pueda ser usado en los respectivos routers
module.exports = {DashBoardDataController}