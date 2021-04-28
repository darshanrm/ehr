const logger = require("../middlewares/logger/logger");
const amqp = require("amqplib");
const path = require("path");
const { prescription_pdf } = require("../config/db.config");

async function connect() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const result = await channel.assertQueue("prescriptionPDF");
    channel.consume("prescriptionPDF", (message) => {
      const data = JSON.parse(message.content.toString());
      logger.log({
        level: "http",
        message: `PDF of prescription for patient ${data.userId} written by healthcare professional ${data.hcpId} received in the message queue`,
      });
      var pdfData = data.pdfBuffer.data;

      prescription_pdf
        .create({
          patient_id: data.userId,
          hcp_id: data.hcpId,
          visit_id: data.visitId,
          prescription: pdfData,
        })
        .then((data) => {
          try {
            logger.log({
              level: "http",
              message: "POST | storeDocument successful",
              metaData: {
                performedBy: "Prescription Service",
              },
            });
          } catch (e) {
            logger.log({
              level: "error",
              message: "POST | storeDocument failed",
              metaData: {
                performedBy: "Prescription Service",
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
