const logger = require("../middlewares/logger/logger");
const amqp = require("amqplib");
const path = require("path");
const db = require("../config/db.config");
const visit_uploaded_docs = db.visit_uploaded_docs;
const fs = require("fs");

async function connect() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const result = await channel.assertQueue("VisitDocument");
    channel.consume("VisitDocument", (message) => {
      const data = JSON.parse(message.content.toString());
      logger.log({
        level: "http",
        message: `Visit report for patient ${data.userId} written by healthcare professional ${data.hcp_id} received in the message queue`,
      });
      var imageData = data.pdfBuffer.data;

      visit_uploaded_docs
        .create({
          patient_id: data.userId,
          visit_id: data.visitId,
          document_name: data.document_name,
          document_data: imageData,
          uploaded_by: data.hcp_id,
        })
        .then((data) => {
          try {
            logger.log({
              level: "http",
              message: "POST | storeDocument successful",
              metaData: {
                data: document_name,
                performedBy: "Visit Uploaded Doc Service",
              },
            });
          } catch (e) {
            logger.log({
              level: "error",
              message: "POST | storeDocument failed",
              metaData: {
                data: file.name,
                performedBy: "Visit Uploaded Doc Service",
              },
            });
          }
        });
      channel.ack(message);
    });

    console.log(`waiting for message..`);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  connect: connect,
};
