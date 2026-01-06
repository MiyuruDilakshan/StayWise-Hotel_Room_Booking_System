import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  bedType: {
    type: String,
    enum: ['Single', 'Double', 'Twin', 'Family', 'Queen', 'King'],
    default: 'Double',
  },
  amenities: [{
    type: String,
  }],
  image: {
    type: String,
    default: '/images/room-default.jpg',
  },
  images: [{
    data: Buffer,        // Store image as binary data
    contentType: String, // Store MIME type (e.g., 'image/jpeg')
    filename: String,
  }],
  isAvailable: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Room', roomSchema);
