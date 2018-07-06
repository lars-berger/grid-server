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

    socket.on('fdsa', data => {
      socket.emit('asdf', data)
    })

    socket.on('join', data => {
      socket.join(data.subID)
      console.log('joined channel' + data.subID)
    });


  });

  return io;

};