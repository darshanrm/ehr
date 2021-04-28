const logger = require("../middlewares/logger/logger");
const amqp = require("amqplib");
const path = require("path");
const db = require("../config/db.config");
const user_uploaded_docs = db.user_uploaded_docs;
const fs = require("fs");

async function connect() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const result = await channel.assertQueue("UserDocument");
    channel.consume("UserDocument", (message) => {
      const data = JSON.parse(message.content.toString());
      logger.log({
        level: "http",
        message: `Visit report for patient ${data.userId} written by healthcare professional ${data.hcp_id} received in the message queue`,
      });
      var imageData = data.pdfBuffer.data;

      user_uploaded_docs
        .create({
          visit_id: data.visitId,
          document_name: data.document_name,
          document_data: imageData,
        })
        .then((data) => {
          try {
            logger.log({
              level: "http",
              message: "POST | storeDocument successful",
              metaData: {
                data: document_name,
                performedBy: `User ${req.query.userId}`,
              },
            });
          } catch (e) {
            logger.log({
              level: "error",
              message: "POST | storeDocument failed",
              metaData: {
                data: document_name,
                performedBy: `User ${req.query.userId}`,
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
