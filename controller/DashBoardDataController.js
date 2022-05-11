const CodigoDescuentoModel = require("../database/models/CodigoDescuentoModel")
const UsuarioModel = require("../database/models/UsuarioModel")

const DashBoardDataController = {

    getDataCartas: async(_req,res)=>{
        const cantidadTotal = await UsuarioModel.count()
        const cantidadCanjeado = await UsuarioModel.count({include:{model:CodigoDescuentoModel,where:{estado:1}}})
        res.json({cantidadTotal,cantidadCanjeado})
    }

}

module.exports = {DashBoardDataController}