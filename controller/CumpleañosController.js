/* Archivo que contiene el controlador del modulo de cumpleaños */

//Importamos sequelize para realizar una consulta directa a la base de datos
const sequelize = require("../database/ConfigBD")

//Declaramos el controlador el cual va a contener todos los metodos de uso declarados
const CumpleañosController = {

    //Funcion Que obtiene las personas que cumplen años segun el día
    getByDay:async(req,res)=>{
        //Recolectamos la fecha a consultar de la consulta
        const { fecha } = req.query
        //Realizamos la consulta a la bd donde obtenemos segun el día exacto igual a la fecha
        const data = await sequelize.query(`select id_usuario, nombres, apellidos, nombre_lugar_registro, telefono_contacto, fecha_nacimiento from usuario left outer join lugar_registro on lugar_registro_fk = id_lugar_registro where day(fecha_nacimiento) = day('${fecha}') and month(fecha_nacimiento) = month('${fecha}')`) 
        //Respondemos con el resultado de esta consulta
        res.json(data[0])
    },

    //Funcion que obtiene las personas que cumplen años segun el mes
    getByMonth:async(req,res)=>{
        //Obtenemos la fecha de la cual queremos obtener los registros, la cual viene por la consulta
        const { fecha } = req.query
        //Realizamos la consulta a la bd donde obtenemos segun el mes exacto igual a la fecha
        const data = await sequelize.query(`select id_usuario, nombres, apellidos, nombre_lugar_registro, telefono_contacto, fecha_nacimiento, day(fecha_nacimiento) dia from usuario left outer join lugar_registro on lugar_registro_fk = id_lugar_registro where month(fecha_nacimiento) = month('${fecha}') order by dia`)
        //Respondemos con el resultado de la consulta
        res.json(data[0])
    },

    //FUncion que obtiene los registros seun un rango de fechas especifico
    getByRange:async(req,res)=>{
        //Obtenemos la fecha de inicio y fecha fin de la consulta 
        const { fecha_inicio, fecha_fin } = req.query
        //Realizamos la consulta filtrando los registros que se encuentren entre las fechas establecidas
        const data = await sequelize.query(`select id_usuario, nombres, apellidos, nombre_lugar_registro, telefono_contacto, fecha_nacimiento, month(fecha_nacimiento) mes,day(fecha_nacimiento) dia from usuario left outer join lugar_registro on lugar_registro_fk = id_lugar_registro where (DATE_FORMAT(fecha_nacimiento, '%m-%d') between DATE_FORMAT('${fecha_inicio}', '%m-%d') and DATE_FORMAT('${fecha_fin}', '%m-%d')) order by mes, dia`)
        //Respondemos con el resultado de la consulta anterior
        res.json(data[0])
    },

    //Es el mismo metodo anterior con la condicion de que filtra por fechas
    getByRangeFilterByAge:async(req,res)=>{
        //Obtenemos las fechas de inicio y fin
        //Asi como tambien obtenemos las edades de inicio y fin
        const { fecha_inicio, fecha_fin, edad_inicio, edad_fin } = req.query
        //Ejecutamos la consulta donde no solo filtra por rango de fechas sino que a su vez tambien filtra por edades
        const data = await sequelize.query(`select id_usuario, nombres, apellidos, nombre_lugar_registro, telefono_contacto, fecha_nacimiento, month(fecha_nacimiento) mes,day(fecha_nacimiento) dia from usuario left outer join lugar_registro on lugar_registro_fk = id_lugar_registro where ((DATE_FORMAT(fecha_nacimiento, '%m-%d') between DATE_FORMAT('${fecha_inicio}', '%m-%d') and DATE_FORMAT('${fecha_fin}', '%m-%d'))) and ((year('2022-05-01')-year(fecha_nacimiento)) >= ${edad_inicio} and (year('2022-05-01')-year(fecha_nacimiento)) <= ${edad_fin}) order by mes, dia`)
        //Respuesta del resultado anterior
        res.json(data[0])
    },

    //El mismo metodo de filtrar por rango pero agregando condicion de lugar
    getByRangeFilterByLugar:async(req, res)=>{
        //Obtenemos la fecha de inicio y fin de la consulta
        const { fecha_inicio, fecha_fin} = req.query
        //Obtenemos los lugares a filtrar del cuerpo de la consulta
        const { lugares } = req.body

        //Definimos lugares como un parentecis inicial
        let lugaresQuery = "("

        //Recorremos el arreglo de lugares que fue enviado por el cuerpo de la consulta
        lugares.forEach(el => {
            //Pusheamos al string de lugares query el nombre del lugar entre comilla simple y una coma
            lugaresQuery += `'${el.nombre_lugar}',`
        });
        //Le quitamos la coma al ultimo lugar insertado
        lugaresQuery = lugaresQuery.substring(0, lugaresQuery.length - 1)
        //Agregamos el parentecis de cierre
        lugaresQuery += ")"

        //Realizamos la consulta donde filtramos por fecha y agregamos que el lugar tiene que ser igual a alguno de los resultados de los parentecis
        const data = await sequelize.query(`select id_usuario, nombres, apellidos, nombre_lugar_registro, telefono_contacto, fecha_nacimiento, month(fecha_nacimiento) mes,day(fecha_nacimiento) dia from usuario left outer join lugar_registro on lugar_registro_fk = id_lugar_registro where (DATE_FORMAT(fecha_nacimiento, '%m-%d') between DATE_FORMAT('${fecha_inicio}', '%m-%d') and DATE_FORMAT('${fecha_fin}', '%m-%d'))  and (nombre_lugar_registro in ${lugaresQuery} ) order by mes, dia;`)
        
        //Respondemos con la consulta anterior
        res.json(data[0])
    },

    //El mismo metodo de obtener por rango de fechas pero en este caso organiza segun se solicite en la consulta
    getByRangeChangeOrder: async(req,res)=>{
        //Obtenemos de la consulta las fechas de inicio y fin, tambien se obtiene el campo a ordenar y el tipo de orden
        const { fecha_inicio, fecha_fin, campo, tipo_orden} = req.query

        //Definimos un string vacio que va a contener el condicional del campo
        let campoSql = ''
        switch (campo) {
            //Si el campo obtenido por la consulta es igual a 1
            case '1':
                //CampoSql va a ser igual a la edad que es restar la fecha actual menos la fecha de nacimiento
                campoSql = `year('${fecha_inicio}')-year(fecha_nacimiento)`
                break;
            //Si el campo obtenido por la consulta es igual a 2
            case '2':
                //Va a obtener filtro por la fecha de nacimiento, ordenar por dia
                campoSql = "DATE_FORMAT(fecha_nacimiento, '%m-%d')"
                break;
            //Si el campo obtenido por la consulta es igual a 3
            case '3':
                //Va a organizar por nombres
                campoSql = "nombres"
                break;
        
            default:
                //Por defecto organiza por fecha
                campoSql = "DATE_FORMAT(fecha_nacimiento, '%m-%d')"
                break;
        }

        //Definimos una variable que va a contener el orden de la consulta sql
        let ordenSql = ''

        //Segun la variable tipo_orden decimos lo siguiente
        switch (tipo_orden) {
            //si el tipo de orden es 1
            case '1':
                //Se va a definir como que se ordene de forma ascendente
                ordenSql = 'asc'
                break;
                //Si el tipo es 2
            case '2':
                //Se va a definir como que se ordene de forma descendente
                ordenSql = 'desc'
                break;
            //Por defecto
            default:
                //Se va a definir como que se ordene de forma ascendente
                ordenSql = 'asc'
                break;
        }
        //Ejecutamos la consulta donde filtra y organiza segun parametros anteriores
        const data = await sequelize.query(`select id_usuario, nombres, apellidos, nombre_lugar_registro, telefono_contacto, fecha_nacimiento, month(fecha_nacimiento) mes,day(fecha_nacimiento) dia from usuario left outer join lugar_registro on lugar_registro_fk = id_lugar_registro where (DATE_FORMAT(fecha_nacimiento, '%m-%d') between DATE_FORMAT('${fecha_inicio}', '%m-%d') and DATE_FORMAT('${fecha_fin}', '%m-%d')) order by ${campoSql} ${ordenSql}`)
        //Respondemos con el resultado de la consulta anterior
        res.json(data[0])
    }

}

//Exportamos el modulo para que este sea usado en los routers
module.exports = CumpleañosController