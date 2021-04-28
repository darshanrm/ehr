const db = require("../config/db.config");
const prescriptions = db.prescriptions;
const prescribed_medicines = db.prescribed_medicines;
const { requestPDF } = require("../queue/publisher");

const createNewPrescription = (req, res) => {
  prescriptions
    .create({
      patient_id: req.body.userId,
      hcp_id: req.body.hcpId,
      visit_id: req.body.visitId,
    })
    .then((prescription) => {
      let counter = 0;
      let size = req.body.medicines.length;
      req.body.medicines.forEach((medicine) => {
        prescribed_medicines
          .create({
            prescription_id: prescription.id,
            medicine_id: medicine.id,
            medicine_name: medicine.name,
            morning_count: medicine.morning,
            afternoon_count: medicine.afternoon,
            evening_count: medicine.evening,
            total: medicine.total,
            no_of_days: medicine.no_of_days,
            note: medicine.note,
          })
          .then(counter++);
      });
      requestPDF(req.body);
      let completionStatus = () => {
        if (counter == size) {
          clearInterval(timer);
          res.send("Medicine record saved successfully");
        }
      };
      let timer = setInterval(completionStatus, 10);
    });
};

module.exports = {
  createNewPrescription,
};
