function initSocket(server) {
  const { Server } = require('socket.io');
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET','POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
    });

    socket.on('bookingCreated', (data) => {
      // broadcast to other clients in same room
      if (data.roomId) io.to(data.roomId).emit('bookingUpdate', data);
      else io.emit('bookingUpdate', data);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
    });
  });

  return io;
}

module.exports = initSocket;
