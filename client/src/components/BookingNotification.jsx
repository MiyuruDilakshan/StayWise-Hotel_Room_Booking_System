import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import '../styles/BookingNotification.css';

const BookingNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to Socket.io server
    const newSocket = io('http://localhost:5000', {
      transports: ['websocket', 'polling'],
    });

    newSocket.on('connect', () => {
      console.log('✅ WebSocket connected:', newSocket.id);
    });

    newSocket.on('disconnect', () => {
      console.log('❌ WebSocket disconnected');
    });

    // Listen for booking updates
    newSocket.on('bookingUpdate', (data) => {
      console.log('📬 Received booking update:', data);
      
      const notification = {
        id: Date.now(),
        type: data.type,
        data: data.data,
        timestamp: new Date(),
      };

      setNotifications((prev) => [notification, ...prev]);

      // Auto-remove notification after 10 seconds
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
      }, 10000);
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getNotificationMessage = (notification) => {
    const { type, data } = notification;
    
    switch (type) {
      case 'new':
        return {
          icon: '🎉',
          title: 'New Booking!',
          message: `${data.guestName || 'Someone'} just booked ${data.roomName || 'a room'}`,
        };
      case 'updated':
        return {
          icon: '📝',
          title: 'Booking Updated',
          message: `Booking #${data.bookingId?.toString().slice(-4)} has been updated`,
        };
      case 'cancelled':
        return {
          icon: '❌',
          title: 'Booking Cancelled',
          message: `Booking #${data.bookingId?.toString().slice(-4)} was cancelled`,
        };
      default:
        return {
          icon: '📢',
          title: 'Notification',
          message: 'You have a new update',
        };
    }
  };

  return (
    <div className="notification-container">
      {notifications.map((notification) => {
        const { icon, title, message } = getNotificationMessage(notification);
        return (
          <div
            key={notification.id}
            className={`notification-card notification-${notification.type}`}
          >
            <div className="notification-icon">{icon}</div>
            <div className="notification-content">
              <h4 className="notification-title">{title}</h4>
              <p className="notification-message">{message}</p>
              <span className="notification-time">
                {notification.timestamp.toLocaleTimeString()}
              </span>
            </div>
            <button
              className="notification-close"
              onClick={() => removeNotification(notification.id)}
              aria-label="Close notification"
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default BookingNotification;
