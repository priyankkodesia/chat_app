const express = require('express')
const path = require('path')
const http = require('http')
const socketIO = require('socket.io')

var app = express();
const publicPath = path.join(__dirname,'./public/')
console.log(publicPath)

app.use(express.static(publicPath));
const port = process.env.PORT || 3000;

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket) => {
	console.log('User connected');

	socket.on('createMessage',(message) => {
		console.log("Message recieved on server",message);
		
		io.emit('newMessage',{
			from:message.from,
			text:message.text,
			createdAt: new Date().getTime()
		})
	});

	socket.on('disconnect',() => {

		return console.log("User disconnected")
	});

	})


server.listen(port,() => {
	console.log(`Server is up on port ${port}`);
})