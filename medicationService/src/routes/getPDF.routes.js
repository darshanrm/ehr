const express = require("express");
const router = express.Router();
const { getPDFController } = require("../controllers/index");

router.route("/byVisitId").get(getPDFController.getByVisitId);

//MODIFIED: get docs by patient id ("/byPatientId")
router.route("/byPatientId").get(getPDFController.getByPatientId);

module.exports = router;
