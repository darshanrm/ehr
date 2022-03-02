const express = require("express");
const router = express.Router();
const { getController } = require("../controllers/index");

//docs matching patient Id
router.route("/getPatientDocuments").get(getController.getPatientDocuments);

//docs matching patient id and hcp id
router.route("/getVisitDocuments").get(getController.getVisitDocuments);

//docs matching hcp id
router.route("/getAuthoredDocuments").get(getController.getAuthoredDocuments);

//MODIFIED: docs by visit Id
router.route("/getByVisitId").get(getController.getByVisitId);

//MODIFIED: lab details (byPrescriptionId)
router.route("/labDetails").get(getController.getLabDetails);

module.exports = router;
