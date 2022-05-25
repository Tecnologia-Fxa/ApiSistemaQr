const sequelize = require("../database/ConfigBD")

const CumpleañosController = {

    getByDay:async(req,res)=>{
        const { fecha } = req.query
        const data = await sequelize.query(`select id_usuario, nombres, apellidos, nombre_lugar_registro, telefono_contacto, fecha_nacimiento from usuario left outer join lugar_registro on lugar_registro_fk = id_lugar_registro where day(fecha_nacimiento) = day('${fecha}') and month(fecha_nacimiento) = month('${fecha}')`) 
        res.json(data[0])
    },

    getByMonth:async(req,res)=>{
        const { fecha } = req.query
        const data = await sequelize.query(`select id_usuario, nombres, apellidos, nombre_lugar_registro, telefono_contacto, fecha_nacimiento, day(fecha_nacimiento) dia from usuario left outer join lugar_registro on lugar_registro_fk = id_lugar_registro where month(fecha_nacimiento) = month('${fecha}') order by dia`)
        res.json(data[0])
    },

    getByRange:async(req,res)=>{
        const { fecha_inicio, fecha_fin } = req.query
        const data = await sequelize.query(`select id_usuario, nombres, apellidos, nombre_lugar_registro, telefono_contacto, fecha_nacimiento, month(fecha_nacimiento) mes,day(fecha_nacimiento) dia from usuario left outer join lugar_registro on lugar_registro_fk = id_lugar_registro where (DATE_FORMAT(fecha_nacimiento, '%m-%d') between DATE_FORMAT('${fecha_inicio}', '%m-%d') and DATE_FORMAT('${fecha_fin}', '%m-%d')) order by mes, dia`)
        res.json(data[0])
    },

    getByRangeFilterByAge:async(req,res)=>{
        const { fecha_inicio, fecha_fin, edad_inicio, edad_fin } = req.query
        const data = await sequelize.query(`select id_usuario, nombres, apellidos, nombre_lugar_registro, telefono_contacto, fecha_nacimiento, month(fecha_nacimiento) mes,day(fecha_nacimiento) dia from usuario left outer join lugar_registro on lugar_registro_fk = id_lugar_registro where ((DATE_FORMAT(fecha_nacimiento, '%m-%d') between DATE_FORMAT('${fecha_inicio}', '%m-%d') and DATE_FORMAT('${fecha_fin}', '%m-%d'))) and ((year('2022-05-01')-year(fecha_nacimiento)) >= ${edad_inicio} and (year('2022-05-01')-year(fecha_nacimiento)) <= ${edad_fin}) order by mes, dia`)
        res.json(data[0])
    },

    getByRangeFilterByLugar:async(req, res)=>{
        const { fecha_inicio, fecha_fin} = req.query
        const { lugares } = req.body
        console.log(lugares)
        let lugaresQuery = "("

        lugares.forEach(el => {
            lugaresQuery += `'${el.nombre_lugar}',`
        });
        lugaresQuery = lugaresQuery.substring(0, lugaresQuery.length - 1)
        lugaresQuery += ")"

        const data = await sequelize.query(`select id_usuario, nombres, apellidos, nombre_lugar_registro, telefono_contacto, fecha_nacimiento, month(fecha_nacimiento) mes,day(fecha_nacimiento) dia from usuario left outer join lugar_registro on lugar_registro_fk = id_lugar_registro where (DATE_FORMAT(fecha_nacimiento, '%m-%d') between DATE_FORMAT('${fecha_inicio}', '%m-%d') and DATE_FORMAT('${fecha_fin}', '%m-%d'))  and (nombre_lugar_registro in ${lugaresQuery} ) order by mes, dia;`)
        
        res.json(data[0])
    },

    getByRangeChangeOrder: async(req,res)=>{
        const { fecha_inicio, fecha_fin, campo, tipo_orden} = req.query

        let campoSql = ''
        switch (campo) {
            case '1':
                campoSql = `year('${fecha_inicio}')-year(fecha_nacimiento)`
                break;
            case '2':
                campoSql = "DATE_FORMAT(fecha_nacimiento, '%m-%d')"
                break;
            case '3':
                campoSql = "nombres"
                break;
        
            default:
                campoSql = "DATE_FORMAT(fecha_nacimiento, '%m-%d')"
                break;
        }
        let ordenSql = ''
        switch (tipo_orden) {
            case '1':
                ordenSql = 'asc'
                break;
            case '2':
                ordenSql = 'desc'
                break;
            default:
                ordenSql = 'asc'
                break;
        }
        const data = await sequelize.query(`select id_usuario, nombres, apellidos, nombre_lugar_registro, telefono_contacto, fecha_nacimiento, month(fecha_nacimiento) mes,day(fecha_nacimiento) dia from usuario left outer join lugar_registro on lugar_registro_fk = id_lugar_registro where (DATE_FORMAT(fecha_nacimiento, '%m-%d') between DATE_FORMAT('${fecha_inicio}', '%m-%d') and DATE_FORMAT('${fecha_fin}', '%m-%d')) order by ${campoSql} ${ordenSql}`)
        res.json(data[0])
    }

}

module.exports = CumpleañosController