const CiudadModel = require("../database/models/CiudadModel")
const EstadoModel = require("../database/models/EstadoModel")
const PaisModel = require("../database/models/PaisModel")

const DataEstadoPaisCiudadController = {
    getAllData:async(req,res)=>{
        const data = await PaisModel.findAll({
            include:{
                model:EstadoModel,
                as:'estado',
                include:{
                    model:CiudadModel,
                    as:'ciudad'
                }
            }
        })
        res.json(data)
    }
}

module.exports = DataEstadoPaisCiudadController