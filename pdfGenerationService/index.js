const http = require('http');
const app = require('./src/app');

const server = http.createServer(app);

server.on('listening', () => {
	console.log('Server Started at port 8085');
})

server.listen(8085);