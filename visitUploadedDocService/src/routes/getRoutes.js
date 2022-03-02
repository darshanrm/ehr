const express = require("express");
const router = express.Router();
const getController = require("../controllers/getRoutes.controller");

//docs by visit Id
router.route("/getVisitDocuments").get(getController.getVisitDocuments);

//MODIFIED: docs by patient Id("/byPatientId")
router.route("/byPatientId").get(getController.byPatientId);

module.exports = router;
