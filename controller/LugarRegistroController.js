const LugarRegistroModel = require("../database/models/LugarRegistroModel")

const LugarRegistroController = {

    getAll:async(_req,res)=>{
        const lugares = await LugarRegistroModel.findAll()
        res.json(lugares)
    },

    getAllActive:async(_req,res)=>{
        const lugares = await LugarRegistroModel.findAll({where:{estado:true},order: [['nombre_lugar_registro','ASC']]})
        res.json(lugares)
    },

    getOne:async(req,res)=>{
        const { id_lugar_registro } = req.query

        const lugar = await LugarRegistroModel.findOne({where:{id_lugar_registro}})
        res.json(lugar)
    },

    create:async(req,res)=>{
        const {nombre_lugar_registro} = req.body

        try {
            await LugarRegistroModel.create({nombre_lugar_registro})
            res.json("Creado Con Exito")
        } catch (error) {
            res.status(400).json(error.message)
        }
    },

    update:async(req,res)=>{
        const {nombre_lugar_registro} = req.body
        const {id_lugar_registro} = req.query

        try {
            await LugarRegistroModel.update({nombre_lugar_registro},{where:{id_lugar_registro}})
            res.json("Actualizado Con Exito")
        } catch (error) {
            res.status(400).json(error.message)
        }
    },

    disable:async(req,res)=>{
        const {id_lugar_registro} = req.query

        await LugarRegistroModel.update({estado:0},{where:{id_lugar_registro}})
        res.json("Inactivado Con Exito")
    },

    enable:async(req,res)=>{
        const {id_lugar_registro} = req.query

        await LugarRegistroModel.update({estado:1},{where:{id_lugar_registro}})
        res.json("Activado Con Exito")
    }

}

module.exports = LugarRegistroController