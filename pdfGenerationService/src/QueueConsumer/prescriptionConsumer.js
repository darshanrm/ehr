const logger = require("../middlewares/logger/logger");
const generatePrescription = require("../generatePrescription");
const amqp = require("amqplib");

async function connect() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const result = await channel.assertQueue("prescription");
    channel.consume("prescription", (message) => {
      const data = JSON.parse(message.content.toString());
      logger.log({
        level: "http",
        message: `Visit data for patient ${data.userId} written by healthcare professional ${data.hcpId} received in the message queue`,
      });
      generatePrescription.createPrescription(data);
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
