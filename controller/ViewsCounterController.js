const sequelize = require("../database/ConfigBD")
const ViewsCounterModel = require("../database/models/ViewsCounterModel")

const ViewsCounterController = {

    newVisit:async(req,res)=>{
        const {page} = req.query
        await sequelize.query(`INSERT INTO views_counter (access_page, access_counter) VALUES ('${page}', 1) ON DUPLICATE KEY UPDATE access_counter = access_counter + 1`)
        res.json("visita registrada")
    },

    getPageVisits:async(req,res)=>{
        const {page} = req.query
        const pageVisits = await ViewsCounterModel.findAll({where:{access_page:page}})
        res.json(pageVisits)
    }

}
module.exports = {ViewsCounterController}