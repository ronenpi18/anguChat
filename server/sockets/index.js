module.exports = function (http){
  var io = require('socket.io')(http);
  var chat = require('./chatSocket')(io);
};
