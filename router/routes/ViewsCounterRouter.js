const { ViewsCounterController } = require("../../controller/ViewsCounterController");
const { validationNamePage } = require("../../validations/validationViewsCounter");

const router = require("express").Router();

router.get('/new-visit', validationNamePage, ViewsCounterController.newVisit)

router.get('/get-visits', validationNamePage, ViewsCounterController.getPageVisits)


module.exports =  router