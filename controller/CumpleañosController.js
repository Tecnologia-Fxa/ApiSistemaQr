const sequelize = require("../database/ConfigBD")
const UsuarioModel = require("../database/models/UsuarioModel")

const CumpleañosController = {

    getByDay:async(req,res)=>{
        const { fecha } = req.query
        const data = await sequelize.query(`select id_usuario, nombres, apellidos, nombre_lugar_registro, telefono_contacto, fecha_nacimiento from usuario left outer join lugar_registro on lugar_registro_fk = id_lugar_registro where day(fecha_nacimiento) = day('${fecha}') and month(fecha_nacimiento) = month('${fecha}')`) 
        res.json(data[0])
    }

}

module.exports = CumpleañosController