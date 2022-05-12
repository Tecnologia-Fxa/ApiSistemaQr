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


        let mes_fecha_inicio = new Date(`${fecha_inicio}T12:00:00.000Z`).getMonth()+1
        let mes_fecha_fin = new Date(`${fecha_fin}T12:00:00.000Z`).getMonth()+1

        console.log(mes_fecha_inicio,mes_fecha_fin)

        let i 
        resultado[0].forEach((el,id) => {
            if (id===0){
                while(mes_fecha_inicio!==el.mes){
                    if(mes_fecha_inicio===13)
                        mes_fecha_inicio=1
                        
                    meses.push(mes_fecha_inicio)
                    valores.push(0)
                    mes_fecha_inicio++
                }
                i=el.mes
            }else if(i===13)
                i=1
            
            if(i!==el.mes){
                meses.push(i)
                valores.push(0)
                i++
            }

            meses.push(el.mes)
            valores.push(el.numRecords)
            i++
        });

        res.json({meses,valores})
        
        }catch(err){
            res.json(err)
        }

    }

}

module.exports = {DashBoardDataController}