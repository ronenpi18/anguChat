module.exports = function (io){
  var chat = io.of('/chat');
  chat.on('connection', function(socket){
    chat.emit('chat:newUser');
    socket.on("user:message", function(m){
      chat.emit('chat:message', m);
    });
  });
};
