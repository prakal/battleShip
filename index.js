var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req,res){
	res.sendFile(__dirname + '/index.html');
});

var state = {};
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('getState', function(){
  	socket.emit('sendState',state);
  });
  socket.on('clicked', function(data){
  	// console.log(data,'clicked');
  	// write to state so that new clients get state of previous updates
  	if (state[data]) {
  		delete state[data];
  	} else {
  		state[data] = true;
  	} 
  	io.emit('clicked id', data, state);
  })
});

http.listen(3000, function(){
	console.log('listening on port 3000...');
})