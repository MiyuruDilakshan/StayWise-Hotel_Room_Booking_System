import express from 'express';
import Room from '../models/Room.js';
import authMiddleware from '../middleware/authMiddleware.js';
import fetch from 'node-fetch';

const router = express.Router();

// Helper function to convert image URL to base64
async function urlToBase64(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();
    return buffer.toString('base64');
  } catch (error) {
    console.error('Error converting image URL to base64:', error);
    return null;
  }
}

// @route   GET /api/rooms
// @desc    Get all rooms with images converted to base64
// @access  Public
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find();
    
    // Convert images to base64 for frontend display
    const roomsWithImages = rooms.map(room => {
      const roomObj = room.toObject();
      if (roomObj.images && roomObj.images.length > 0) {
        roomObj.images = roomObj.images.map(img => ({
          src: `data:${img.contentType};base64,${img.data.toString('base64')}`,
          filename: img.filename
        }));
      }
      
      // Ensure the string image URL is preserved
      if (roomObj.image) {
          // No need to change anything if it is just a URL string
      } else {
          // Fallback if image is missing but available in images array? 
          // Not strictly necessary as frontend handles priority, but good for consistency
          if (roomObj.images && roomObj.images.length > 0) {
              roomObj.image = roomObj.images[0].src;
          }
      }

      return roomObj;
    });
    
    res.status(200).json({
      success: true,
      count: rooms.length,
      data: roomsWithImages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/rooms/:id
// @desc    Get single room with images
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found',
      });
    }
    
    const roomObj = room.toObject();
    if (roomObj.images && roomObj.images.length > 0) {
      roomObj.images = roomObj.images.map(img => ({
        src: `data:${img.contentType};base64,${img.data.toString('base64')}`,
        filename: img.filename
      }));
    }
    
    res.status(200).json({
      success: true,
      data: roomObj,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   POST /api/rooms
// @desc    Create new room (Admin only)
// @access  Private/Admin
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, description, price, capacity, bedType, amenities, imageUrls, images: base64Images } = req.body;

    let images = [];

    // Handle base64 images directly from frontend
    if (base64Images && Array.isArray(base64Images)) {
      images = base64Images.map(img => {
        // Check if it's already in the correct format or just a base64 string
        if (typeof img === 'string') {
          // Remove data:image/jpeg;base64, prefix if present
          const matches = img.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
          if (matches && matches.length === 3) {
            return {
              data: Buffer.from(matches[2], 'base64'),
              contentType: matches[1],
              filename: `room-${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`
            };
          } else {
             // Assume raw base64
             return {
              data: Buffer.from(img, 'base64'),
              contentType: 'image/jpeg',
              filename: `room-${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`
            };
          }
        }
        return img;
      });
    }

    // Convert image URLs to base64 (legacy support or URL input)
    if (imageUrls && Array.isArray(imageUrls)) {
      for (const url of imageUrls) {
        const base64 = await urlToBase64(url);
        if (base64) {
          images.push({
            data: Buffer.from(base64, 'base64'),
            contentType: 'image/jpeg',
            filename: `room-${Date.now()}.jpg`
          });
        }
      }
    }

    const room = new Room({
      name,
      description,
      price,
      capacity,
      bedType,
      amenities,
      images,
      isAvailable: true,
    });

    const savedRoom = await room.save();
    
    // Convert images back to base64 for response
    const roomObj = savedRoom.toObject();
    if (roomObj.images && roomObj.images.length > 0) {
      roomObj.images = roomObj.images.map(img => ({
        src: `data:${img.contentType};base64,${img.data.toString('base64')}`,
        filename: img.filename
      }));
    }
    
    res.status(201).json({
      success: true,
      message: 'Room created successfully',
      data: roomObj,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   PUT /api/rooms/:id
// @desc    Update room (Admin only)
// @access  Private/Admin
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { imageUrls, images: base64Images, ...updateData } = req.body;
    
    let images = [];

    // Handle base64 images
    if (base64Images && Array.isArray(base64Images)) {
       const newImages = base64Images.map(img => {
        if (typeof img === 'string') {
          const matches = img.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
          if (matches && matches.length === 3) {
            return {
              data: Buffer.from(matches[2], 'base64'),
              contentType: matches[1],
              filename: `room-${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`
            };
          } else {
             return {
              data: Buffer.from(img, 'base64'),
              contentType: 'image/jpeg',
              filename: `room-${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`
            };
          }
        }
        return img;
      });
      images = [...images, ...newImages];
    }

    // If new image URLs are provided, convert them to base64
    if (imageUrls && Array.isArray(imageUrls)) {
      for (const url of imageUrls) {
        const base64 = await urlToBase64(url);
        if (base64) {
          images.push({
            data: Buffer.from(base64, 'base64'),
            contentType: 'image/jpeg',
            filename: `room-${Date.now()}.jpg`
          });
        }
      }
    }
    
    if (images.length > 0) {
        updateData.images = images;
    }
    
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found',
      });
    }

    const roomObj = room.toObject();
    if (roomObj.images && roomObj.images.length > 0) {
      roomObj.images = roomObj.images.map(img => ({
        src: `data:${img.contentType};base64,${img.data.toString('base64')}`,
        filename: img.filename
      }));
    }

    res.status(200).json({
      success: true,
      message: 'Room updated successfully',
      data: roomObj,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   DELETE /api/rooms/:id
// @desc    Delete room (Admin only)
// @access  Private/Admin
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Room deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
