    	var socket = io();

    	socket.on('connect',function(){
    		console.log("Server connected")
    	})


    	socket.on('disconnect',function() {
    		console.log("Disconnected from the server")
    	})

    	socket.on('newMessage',function(message){
    		console.log("Message recieved on the client side: ",message)
    	});

    	socket.emit('createMessage',{
    		from : 'Priyank',
    		text : "This is new message from the client"
    	});