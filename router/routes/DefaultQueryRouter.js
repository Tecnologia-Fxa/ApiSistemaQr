const DefaultQueryRouter = (model, name_fk) =>{
    const router = require("express").Router();

    const DefaultQuery = require('../../controller/DefaultQuery')

    const controller = DefaultQuery(model, name_fk)

    router.get('/', controller.getAll)

    router.get('/get-by-fk', controller.getByFk)

    return router
}

module.exports = DefaultQueryRouter