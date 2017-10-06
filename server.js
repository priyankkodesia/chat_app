const express = require('express')
const path = require('path')
const http = require('http')
const socketIO = require('socket.io')
var {generate_message,generate_location_message} = require('./utils/generate_message.js')

var app = express();
const publicPath = path.join(__dirname,'./public/')
console.log(publicPath)

app.use(express.static(publicPath));
const port = process.env.PORT || 3000;

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket) => {
	console.log('User connected');

	socket.emit('newMessage',generate_message("Admin","Welcome to the Chat App"));

	socket.broadcast.emit('newMessage',generate_message("Admin","A new User has joined"));
		

	socket.on('createMessage',(message) => {
		console.log("Message recieved on server",message);
		
		io.emit('newMessage',generate_message(message.from,message.text));
	});

	socket.on('createLocationMessage',(coords) => {
		console.log('Location message recieved',coords);
		 io.emit('newLocationMessage',generate_location_message("Admin",coords.latitude,coords.longitude))

	});

	socket.on('disconnect',() => {
		return console.log("User disconnected")
	});

	});


server.listen(port,() => {
	console.log(`Server is up on port ${port}`);
})