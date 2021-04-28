const logger = require("../middlewares/logger/logger");
const amqp = require("amqplib");

const requestPDF = (medication) => {
  logger.log({
    level: "http",
    message: `PDF generation request is being sent for ${medication.visitId}`,
    metaData: {
      performedBy: medication.hcpId,
    },
  });

  connect();
  async function connect() {
    try {
      const connection = await amqp.connect("amqp://localhost:5672");
      const channel = await connection.createChannel();
      const result = await channel.assertQueue("medication", {
        durable: true,
      });
      channel.sendToQueue(
        "medication",
        Buffer.from(JSON.stringify(medication)),
        { persistent: true }
      );
      logger.log({
        level: "http",
        message: `PDF generation request for lab visit id ${medication.visitId} has been submitted to the queue`,
        metaData: {
          performedBy: medication.hcpId,
        },
      });
    } catch (error) {
      logger.log({
        level: "error",
        message: `Some error occured while submitting the PDF generation request for ${medication.visitId} to the queue`,
        metaData: {
          performedBy: medication.hcpId,
        },
      });
    }
  }
};

module.exports = {
  requestPDF,
};
