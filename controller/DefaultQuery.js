const DefaultQuery = (model, name_fk) =>{

    model = require(`../database/models/${model}`)

    const Controller = {
        getAll:async(_req,res)=>{
            const items = await model.findAll()
            res.json(items)
        },

        getByFk:async(req,res)=>{
            const { id } = req.query
            const items = await model.findAll({where:{[name_fk]:id}})
            res.json(items)
        }
    }

    return Controller
}

module.exports = DefaultQuery