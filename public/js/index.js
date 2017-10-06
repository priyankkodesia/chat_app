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
})
        var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -160.397, lng: 32.644},
          zoom: 6
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

    	})

