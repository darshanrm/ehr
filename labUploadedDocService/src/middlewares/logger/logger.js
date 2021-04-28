const winston = require("winston");
const path = require("path");

const Format = winston.format.printf((info) => {
  if (info instanceof Error) {
    return `${info.timestamp} ${info.level}: ${info.message} ${innfo.stack}`;
  }
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

const filePath = path.join(__dirname, "logFile", "service.log");
console.log(filePath);

const logger = winston.createLogger({
  level: "http",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "DD-MM-YYYY HH:mm:ss",
    }),
    winston.format.errors({ stack: true }),
    winston.format.simple()
  ),
  defaultMeta: { service: "lab-uploaded-docs-service" },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: filePath }),
  ],
});

module.exports = logger;
