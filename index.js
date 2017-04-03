var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.on("im online", function (data) {
        // announce the online status of a new user
        socket.broadcast.emit('connected user',  {"name": socket.handshake.headers.user.username});
    });
  //online
  
  //game try!
  socket.on('ademola', function(gme){
    io.emit('ademola', gme);
  });
  //power up
   socket.on('power', function(hunts){
    io.emit('power', hunts);
  });
  //power up2
   socket.on('power2', function(power){
    io.emit('power2', power);
  });
  //webcam
socket.on('webcam', function(webcam){
    io.emit('webcam', webcam);
  });
  //move down
  socket.on('player2-1', function(down){
    io.emit('player2-1', down);
  });
  //player2
  socket.on('player2', function(hunts){
    io.emit('player2', hunts);
  });
  //move down
  socket.on('player2-1', function(down){
    io.emit('player2-1', down);
  });
  //player1
   socket.on('hunts', function(msg){
    io.emit('hunts', msg);
  });
   socket.on('player1', function(hunts){
    io.emit('player1', hunts);
  });
  //state-1
  socket.on('state', function(stats){
    io.emit('state', stats);
  });
   //state-2
  socket.on('state2', function(stats){
    io.emit('state2', stats);
  });
  //login
  socket.on('login', function(login){
    io.emit('login', login);
  });
  //move down
  socket.on('player1-1', function(down){
    io.emit('player1-1', down);
  });
});
http.listen(port, function(){
  console.log('listening on *:' + port);
});
