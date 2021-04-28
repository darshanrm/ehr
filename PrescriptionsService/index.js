const http = require("http");
const db = require("./src/config/db.config");
const app = require("./src/app");

const server = http.createServer(app);

server.on("listening", () => {
  console.log("Server Started at port 8087");
});

db.sequelize.sync().then(() => {
  console.log("Connected to Database Server");
  server.listen(8087);
});
