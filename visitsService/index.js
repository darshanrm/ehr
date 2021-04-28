const app = require('./src/app');
const http = require('http');
const db = require('./src/config/db.config');

const server = http.createServer(app);
server.on('listening',()=>{
    console.log("Server started at port 8084");
})

db.sequelize.sync().then(() => {
	console.log("Connected to Database Server");
	server.listen(8084);
})