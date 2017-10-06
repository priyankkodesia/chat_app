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
    		console.log("this got trigered")
    	});

    	});

    	var location_button = $('#location_button');
    	location_button.on('click', function(){
    		if(!navigator.geolocation){
    			return alert('Geolocation not enabled on your device')
    		}

    		var cords = navigator.geolocation.getCurrentPosition(function(position){
				var latitude = position.coords.latitude;
				var longitude = position.coords.longitude;
				console.log(latitude,longitude)

	    		},function(err){
    			console.log("Unable to fetch the location")
    		})

    	})

