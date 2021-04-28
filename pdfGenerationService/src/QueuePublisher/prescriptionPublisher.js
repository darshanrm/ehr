const logger = require("../middlewares/logger/logger");
const amqp = require("amqplib");

const publishPrescription = (pdf) => {
  logger.log({
    level: "http",
    message: `PDF publish request came for visit id ${pdf.visitId}`,
    metaData: {
      performedBy: "PDF Genertion Service",
    },
  });

  connect();
  async function connect() {
    try {
      const connection = await amqp.connect("amqp://localhost:5672");
      const channel = await connection.createChannel();
      const result = await channel.assertQueue("prescriptionPDF", {
        durable: true,
      });
      console.log(typeof pdf);
      console.log(pdf);
      channel.sendToQueue("prescriptionPDF", Buffer.from(JSON.stringify(pdf)), {
        persistent: true,
      });
      logger.log({
        level: "http",
        message: `Visit report for visit id ${pdf.visitId} has been submitted to the queue`,
        metaData: {
          performedBy: "PDF Generation Service",
        },
      });
    } catch (error) {
      logger.log({
        level: "error",
        message: `Some error occured while submitting the visit report for visit ${pdf.visitId} to the queue`,
        metaData: {
          performedBy: "PDF Generation Service",
        },
      });
    }
  }
};

module.exports = {
  publishPrescription,
};
