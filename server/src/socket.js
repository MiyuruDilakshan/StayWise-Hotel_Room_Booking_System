import { Server } from 'socket.io';

function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN || 'http://localhost:5174',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log(`✓ Socket connected: ${socket.id}`);

    // Join a specific room/namespace
    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    // Leave a room
    socket.on('leaveRoom', (roomId) => {
      socket.leave(roomId);
      console.log(`Socket ${socket.id} left room ${roomId}`);
    });

    // Booking events
    socket.on('bookingCreated', (data) => {
      if (data.roomId) {
        io.to(data.roomId).emit('bookingUpdate', {
          type: 'new',
          data: data,
        });
      } else {
        io.emit('bookingUpdate', {
          type: 'new',
          data: data,
        });
      }
      console.log(`Booking created event emitted for room ${data.roomId}`);
    });

    socket.on('bookingUpdated', (data) => {
      io.emit('bookingUpdate', {
        type: 'updated',
        data: data,
      });
      console.log(`Booking updated event emitted`);
    });

    socket.on('bookingCancelled', (data) => {
      io.emit('bookingUpdate', {
        type: 'cancelled',
        data: data,
      });
      console.log(`Booking cancelled event emitted`);
    });

    // User presence
    socket.on('userOnline', (userId) => {
      socket.broadcast.emit('userStatusChange', {
        userId,
        status: 'online',
      });
    });

    socket.on('userOffline', (userId) => {
      socket.broadcast.emit('userStatusChange', {
        userId,
        status: 'offline',
      });
    });

    socket.on('disconnect', () => {
      console.log(`✓ Socket disconnected: ${socket.id}`);
    });
  });

  return io;
}

export default initSocket;
