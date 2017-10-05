    	var socket = io();

    	socket.on('connect',function(){
    		console.log("Server connected")
    	})


    	socket.on('disconnect',function() {
    		console.log("Disconnected from the server")
    	})

    	socket.on('newMessage',function(message){
    		console.log("Message recieved on the client side: ",message);
    		var username = message.from;
    		var message = message.text;
    		var div = '<div class="alert alert-success" role="alert">  <h4 id="incoming-message-user" class="alert-heading">'+username +'</h4><p id="incoming-message">'+message+'</p></div>'
    	$('#box').prepend(div);
    	});


    	$('#chat-form').on('submit',function(e){
    		e.preventDefault();

    		socket.emit('createMessage',{
    		from : $('#username').val(),
    		text : $('#message').val()
    	}, function(){

    	});

    	})
