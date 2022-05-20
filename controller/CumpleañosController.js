const sequelize = require("../database/ConfigBD")
const UsuarioModel = require("../database/models/UsuarioModel")

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
    }

}

module.exports = CumpleañosController