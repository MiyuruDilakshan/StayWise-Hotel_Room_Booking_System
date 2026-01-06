import express from 'express';
import Booking from '../models/Booking.js';
import Room from '../models/Room.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { sendBookingReceipt } from '../services/emailService.js';

const router = express.Router();

// Store io instance to emit events
let io;
export const setSocketIO = (socketIO) => {
  io = socketIO;
};

// @route   POST /api/bookings
// @desc    Create new booking
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { roomId, checkIn, checkOut, guests, totalPrice, specialRequests } = req.body;

    // Validate required fields
    if (!roomId || !checkIn || !checkOut || !guests || !totalPrice) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: roomId, checkIn, checkOut, guests, totalPrice',
      });
    }

    // Fetch room to get image
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    let roomImage = null;
    if (room.images && room.images.length > 0) {
      const img = room.images[0];
      roomImage = `data:${img.contentType};base64,${img.data.toString('base64')}`;
    } else if (room.image) {
      roomImage = room.image;
    }

    const booking = new Booking({
      user: req.user._id,
      room: roomId,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guests,
      totalPrice,
      specialRequests,
      status: 'pending',
      roomImage, // Save the image snapshot
    });

    const savedBooking = await booking.save();

    // Populate room and user details
    const populatedBooking = await Booking.findById(savedBooking._id)
      .populate('user', 'name email phone')
      .populate('room', 'name price bedType capacity');

    // Send email receipt automatically
    try {
      const userEmail = populatedBooking.user ? populatedBooking.user.email : null;
      if (userEmail) {
        const bookingDetails = {
          bookingId: savedBooking._id,
          fullName: populatedBooking.user ? populatedBooking.user.name : 'Guest',
          selectedRoom: populatedBooking.room ? populatedBooking.room.name : 'Unknown Room',
          checkInDate: savedBooking.checkIn,
          checkOutDate: savedBooking.checkOut,
          numberOfGuests: savedBooking.guests,
          totalPrice: savedBooking.totalPrice,
          specialRequests: savedBooking.specialRequests
        };
        console.log('📧 Sending booking confirmation email to:', userEmail);
        await sendBookingReceipt(userEmail, bookingDetails);
        console.log('✅ Email sent successfully');
      } else {
        console.warn('⚠️ No user email found for booking:', savedBooking._id);
      }
    } catch (emailError) {
      console.error('❌ Failed to send automatic email receipt:', emailError);
      // Don't fail the request if email fails, just log it
    }

    // Emit WebSocket event for real-time notifications
    if (io) {
      io.emit('bookingUpdate', {
        type: 'new',
        data: {
          bookingId: savedBooking._id,
          roomName: populatedBooking.room ? populatedBooking.room.name : 'Unknown Room',
          guestName: populatedBooking.user ? populatedBooking.user.name : 'Guest',
          checkIn: savedBooking.checkIn,
          checkOut: savedBooking.checkOut,
          totalPrice: savedBooking.totalPrice,
        },
      });
      console.log('🔔 WebSocket notification sent for new booking');
    }

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: populatedBooking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/bookings/stats
// @desc    Get booking statistics
// @access  Private
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const cancelledBookings = await Booking.countDocuments({ status: 'cancelled' });

    // Calculate revenue from confirmed bookings
    const revenueResult = await Booking.aggregate([
      { $match: { status: 'confirmed' } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const revenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    res.status(200).json({
      success: true,
      data: {
        totalBookings,
        confirmedBookings,
        pendingBookings,
        cancelledBookings,
        revenue
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/bookings/user/:userId
// @desc    Get user's bookings
// @access  Private
router.get('/user/:userId', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId })
      .populate('room', 'name price bedType capacity images image')
      .sort({ createdAt: -1 });

    // Convert room images to base64 for frontend display
    const bookingsWithImages = bookings.map(booking => {
      const bookingObj = booking.toObject();
      
      // If we have a stored snapshot image, use it
      if (bookingObj.roomImage) {
        // If it's a base64 string or URL, we can use it directly.
        // But to be consistent with frontend expectation of room.images[0].src or room.image
        // We might want to attach it to the room object or leave it on the booking object.
        // Let's leave it on the booking object and update frontend to check it.
      }

      if (bookingObj.room) {
        // Handle binary images array
        if (bookingObj.room.images && bookingObj.room.images.length > 0) {
          bookingObj.room.images = bookingObj.room.images.map(img => ({
            src: `data:${img.contentType};base64,${img.data.toString('base64')}`,
            filename: img.filename
          }));
        }
        // Ensure the legacy image field is also present (it's already populated but good to be explicit if needed)
      }
      return bookingObj;
    });

    res.status(200).json({
      success: true,
      count: bookingsWithImages.length,
      data: bookingsWithImages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/bookings/:id
// @desc    Get booking details
// @access  Private
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email phone address')
      .populate('room');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   PUT /api/bookings/:id
// @desc    Update booking status
// @access  Private
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { status, specialRequests } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (specialRequests) updateData.specialRequests = specialRequests;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )
      .populate('user', 'name email phone')
      .populate('room', 'name price bedType capacity');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/bookings
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    const bookings = await Booking.find()
      .populate('user', 'name email phone')
      .populate('room', 'name price bedType')
      .sort({ createdAt: -1 })
      .limit(limit);

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   POST /api/bookings/email-receipt
// @desc    Send booking receipt email
// @access  Public (or Private depending on needs, keeping public for guest checkout flow)
router.post('/email-receipt', async (req, res) => {
  try {
    const { email, bookingDetails } = req.body;

    if (!email || !bookingDetails) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and booking details',
      });
    }

    const result = await sendBookingReceipt(email, bookingDetails);

    res.status(200).json({
      success: true,
      message: 'Receipt sent successfully',
      preview: result.preview
    });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
    });
  }
});

export default router;
