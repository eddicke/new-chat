var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var nicknames = [];
var old_messages = [];

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  //old messages*********************************
  socket.on('nickname',function(data, callback){

    if (nicknames.indexOf(data) != -1){
        callback(false);
    }else{
        callback(true);
        nicknames.push(data);
        socket.nickname = data;
        io.sockets.emit('nicknames', nicknames);

         //------------ send the old messages-------------
                    io.sockets.emit('old_messages', old_messages);


    }
});

socket.on('user message',function (data){

       // ------------ Update de old_message list --------------
            old_messages.push(socket.nickname + " - " +data);
            if (old_messages.length > 10)
            {var aux = old_messages.pop()}


    io.sockets.emit('user message', {
        nick: socket.nickname,
        message: data
    });
});

socket.on('disconnect', function(){
    if (!socket.nickname) return;
    if (nicknames.indexOf(socket.nickname) > -1){
    nicknames.splice(nicknames.indexOf(socket.nickname),1);
    }
    io.sockets.emit('nicknames', nicknames);
});
  //***********************************************
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
