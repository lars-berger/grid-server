module.exports.start = function (server) {
  const io = require('socket.io')(server, { wsEngine: 'ws' }); // remove wsEngine object in prod


  users = {};
  rooms = {};
  connections = [];

  io.sockets.on('connection', (socket) => {
    // Connection
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);

    // Disconnection
    socket.on('disconnect', data => {
      connections.splice(connections.indexOf(socket), 1)
      if (rooms[users[socket.id]] && rooms[users[socket.id]]=== 1 ) delete rooms[users[socket.id]];
      else if (rooms[users[socket.id]]){
         rooms[users[socket.id]]--;
         io.to(users[socket.id]).emit('num_users', rooms[users[socket.id]]);
      }
      delete users[socket.id];
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
      users[socket.id] = data.room;
      if (rooms[data.room])rooms[data.room]++;
      else rooms[data.room] = 1;
      io.to(data.room).emit('num_users', rooms[data.room]);
    });
  });

  return io;

};