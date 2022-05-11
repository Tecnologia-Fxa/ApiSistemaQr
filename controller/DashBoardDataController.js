const sequelize = require("../database/ConfigBD")
const CodigoDescuentoModel = require("../database/models/CodigoDescuentoModel")
const UsuarioModel = require("../database/models/UsuarioModel")

const DashBoardDataController = {

    getDataCartas: async(_req,res)=>{
        const cantidadTotal = await UsuarioModel.count()
        const cantidadCanjeado = await UsuarioModel.count({include:{model:CodigoDescuentoModel,where:{estado:1}}})
        res.json({cantidadTotal,cantidadCanjeado})
    },

    getDataConteoMensualLugarRegistro:async(req,res)=>{
        const { fecha_inicio, fecha_fin, id_lugar_registro } = req.query

        let condicion_lugar = ''
        if(id_lugar_registro){
            condicion_lugar += `and lugar_registro_fk = '${id_lugar_registro}'`
        }

        try{
        const resultado = await sequelize.query(`select year(createdAt) año,month(createdAt) mes, count(*) as numRecords from usuario where (createdAt BETWEEN '${fecha_inicio}' AND '${fecha_fin}') ${condicion_lugar} Group By  año, mes`)
        const meses = []
        const valores = []

        resultado[0].forEach(el => {
            meses.push(el.mes)
            valores.push(el.numRecords)
        });
            res.json({meses,valores})
        }catch(err){
            res.json(err)
        }

    }

}

module.exports = {DashBoardDataController}