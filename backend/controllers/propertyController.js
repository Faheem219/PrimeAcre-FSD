// controllers/propertyController.js
const Property = require('../models/property');
const User = require('../models/user');
const cloudinary = require('../config/cloudinaryConfig');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Multer and Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'properties',
    allowed_formats: ['jpg', 'png', 'webp', 'jpeg'],
  },
});

const parser = multer({ storage: storage });

exports.uploadImages = parser.array('images', 5); // Max 5 images

// Get all properties
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('agent').populate('reviews');
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single property
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('agent')
      .populate({
        path: 'reviews',
        populate: { path: 'client', select: 'firstName lastName' },
      });
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new property
exports.createProperty = async (req, res) => {
  try {
    const agentId = req.user.id; // Assuming agent is authenticated

    // Verify that the user is an agent
    const agent = await User.findById(agentId);
    if (!agent || agent.role !== 'Agent') {
      return res.status(403).json({ error: 'Unauthorized: Only agents can add properties' });
    }

    let images = [];

    // Check if files were uploaded via Multer
    if (req.files && req.files.length > 0) {
      // Collect image URLs from Cloudinary uploads
      images = req.files.map((file) => file.path);
    } else if (req.body.images && req.body.images.length > 0) {
      // Use image URLs provided in the request body
      images = req.body.images;
    } else {
      // No images provided
      return res.status(400).json({ error: 'At least one image is required' });
    }

    // Create new property with data from req.body and images array
    const newProperty = new Property({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      location: req.body.location,
      size: req.body.size,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      propertyType: req.body.propertyType,
      status: req.body.status || 'Available',
      agent: agentId,
      images: images,
      dateListed: req.body.dateListed || Date.now(),
    });

    const savedProperty = await newProperty.save();

    // Add property to agent's list of properties
    agent.properties.push(savedProperty._id);
    await agent.save();

    res.status(201).json(savedProperty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a property
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Check if the authenticated agent owns the property
    if (property.agent.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // If new images are uploaded, delete the old images from Cloudinary
    if (req.files && req.files.length > 0) {
      // Extract public IDs from the old image URLs
      const oldPublicIds = property.images.map((imageUrl) => {
        const parts = imageUrl.split('/');
        const filenameWithExtension = parts[parts.length - 1]; // imagename.jpg
        const publicId = filenameWithExtension.split('.')[0]; // imagename (without extension)
        return `properties/${publicId}`; // Assuming the images are in the 'properties' folder
      });

      // Delete the old images from Cloudinary
      for (const publicId of oldPublicIds) {
        await cloudinary.uploader.destroy(publicId);
      }

      // Upload the new images to Cloudinary
      const newImages = req.files.map((file) => file.path);
      req.body.images = newImages; // Add the new image URLs to the request body
    }

    // Update the property with new data from req.body
    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedProperty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a property
exports.deleteProperty = async (req, res) => {
  try {
    // Find the property and check ownership in one query
    const property = await Property.findOneAndDelete({
      _id: req.params.id,
      agent: req.user.id, // Ensures that the agent owns the property
    });

    if (!property) {
      return res.status(404).json({ error: 'Property not found or unauthorized' });
    }

    // Extract public IDs from the image URLs
    const publicIds = property.images.map((imageUrl) => {
      // Assuming imageUrl is like 'https://res.cloudinary.com/your_cloud_name/image/upload/v1623652876/folder/imagename.jpg'
      const parts = imageUrl.split('/');
      const filenameWithExtension = parts[parts.length - 1]; // imagename.jpg
      const publicId = filenameWithExtension.split('.')[0]; // imagename (without extension)
      return `properties/${publicId}`; // Assuming the images are in the 'properties' folder
    });

    // Delete images from Cloudinary
    for (const publicId of publicIds) {
      await cloudinary.uploader.destroy(publicId);
    }

    res.status(200).json({ message: 'Property and associated images deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function to mark a property as interested by a client
exports.markPropertyAsInterested = async (req, res) => {
  const { propertyId } = req.params;
  const userId = req.user.id; // Assuming req.user is populated after authentication

  try {
    // Find the property
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Find the user and update interested properties
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the property is already marked as interested
    if (!user.interestedProperties.includes(propertyId)) {
      user.interestedProperties.push(propertyId);
      await user.save();
    }

    res.status(200).json({ message: 'Property marked as interested' });
  } catch (err) {
    console.error('Error marking property as interested:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
