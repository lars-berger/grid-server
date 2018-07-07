module.exports.start = function (server) {
  const io = require('socket.io')(server, { wsEngine: 'ws' }); // remove wsEngine object in prod

  users = [];
  connections = [];

  io.sockets.on('connection', (socket) => {
    // Connection
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);

    // Disconnection
    socket.on('disconnect', data => {
      connections.splice(connections.indexOf(socket), 1)
      console.log('Disconnected: %s sockets connected', connections.length);
    });

    socket.on('new message', data => {
      io.to(data.room).emit('handle message', {
        name: data.name,
        message: data.message,
      })
    })
    socket.on('join', data => {
      socket.join(data.room)
      console.log('joined channel' + data.room)
    });


  });

  return io;

};