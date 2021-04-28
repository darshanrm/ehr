const logger = require("../middlewares/logger/logger");
const axios = require("axios");

//docs related to one patient
//TODO: get documents from prescription, medication, lab, visit-uploaded docs, hcp-service, visits service
const getPatientDocuments = async (req, res) => {
  let visitIds = [];
  try {
    await axios
      .get(
        "http://localhost:8084/visitDetails/get/byPatientId?userId=" +
          req.query.userId
      )
      .then((documents) => {
        documents.data.forEach((document) => {
          visitIds.push(document.id);
        });
        console.log(visitIds);
        axios
          .get("http://localhost:8081/Documents/get/getVisitDocuments", {
            params: {
              visitIds: visitIds,
            },
          })
          .then(function (response) {
            console.log(response.data);
            res.send(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
      });
  } catch (error) {
    console.log(error);
  }
};

//docs related to one visit
const getVisitDocuments = (req, res) => {
  let visitIds = [];
  try {
    axios
      .get(
        "http://localhost:8084/visitDetails/get/byPatientIdAndHcpId?userId=" +
          req.query.userId +
          "&hcpId=" +
          req.query.hcpId
      )
      .then((documents) => {
        documents.data.forEach((document) => {
          visitIds.push(document.id);
        });
        console.log(visitIds);
        axios
          .get("http://localhost:8081/Documents/get/getVisitDocuments", {
            params: {
              visitIds: visitIds,
            },
          })
          .then(function (response) {
            console.log(response.data);
            res.send(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
      });
  } catch (error) {
    console.log(error);
  }
};

//docs writtten by healthcare professional
const getAuthoredDocuments = (req, res) => {
  let visitIds = [];
  try {
    axios
      .get(
        "http://localhost:8084/visitDetails/get/byHcpId?hcpId=" +
          req.query.hcpId
      )
      .then((documents) => {
        documents.data.forEach((document) => {
          visitIds.push(document.id);
        });
        console.log(visitIds);
        axios
          .get("http://localhost:8081/Documents/get/getVisitDocuments", {
            params: {
              visitIds: visitIds,
            },
          })
          .then(function (response) {
            console.log(response.data);
            res.send(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPatientDocuments,
  getVisitDocuments,
  getAuthoredDocuments,
};
