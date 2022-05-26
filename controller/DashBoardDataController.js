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
            }
            
            if(i>12)
                i=1
            
            while(i!==el.mes){
                if(i>12)
                    i=1
                meses.push(i)
                valores.push(0)
                i++
            }

            meses.push(el.mes)
            valores.push(el.numRecords)
            i++
        });

        let mesesFinal = meses[(meses.length)-1]
        while(mesesFinal !== mes_fecha_fin){
            if(mesesFinal>12)
                mesesFinal=1

            mesesFinal++
            meses.push(mesesFinal)
            valores.push(0)
        }

        res.json({meses,valores})
        
        }catch(err){
            res.json(err)
        }

    },

    getDataAge: async(_req,res)=>{
        const dataUsuarios = await UsuarioModel.findAll({attributes:["fecha_nacimiento"]})
        res.json(dataUsuarios)
    }

}

module.exports = {DashBoardDataController}