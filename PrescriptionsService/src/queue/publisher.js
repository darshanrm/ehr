const logger = require("../middlewares/logger/logger");
const amqp = require("amqplib");

const requestPDF = (prescription) => {
  logger.log({
    level: "http",
    message: `PDF generation request is being sent for ${prescription.visitId}`,
    metaData: {
      performedBy: prescription.hcpId,
    },
  });

  connect();
  async function connect() {
    try {
      const connection = await amqp.connect("amqp://localhost:5672");
      const channel = await connection.createChannel();
      const result = await channel.assertQueue("prescription", {
        durable: true,
      });
      channel.sendToQueue(
        "prescription",
        Buffer.from(JSON.stringify(prescription)),
        { persistent: true }
      );
      logger.log({
        level: "http",
        message: `PDF generation request for lab visit id ${prescription.visitId} has been submitted to the queue`,
        metaData: {
          performedBy: prescription.hcpId,
        },
      });
    } catch (error) {
      logger.log({
        level: "error",
        message: `Some error occured while submitting the PDF generation request for ${prescription.visitId} to the queue`,
        metaData: {
          performedBy: prescription.hcpId,
        },
      });
    }
  }
};

module.exports = {
  requestPDF,
};
