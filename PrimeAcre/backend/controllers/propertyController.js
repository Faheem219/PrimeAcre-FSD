// controllers/propertyController.js
const Property = require('../models/property');
const Agent = require('../models/user');
const cloudinary = require('../config/cloudinaryConfig');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Multer and Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'properties',
    allowed_formats: ['jpg', 'png'],
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

    // If new images are uploaded, upload them to Cloudinary
    if (req.files && req.files.length > 0) {
      const images = req.files.map((file) => file.path);
      req.body.images = images;
    }

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
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Check if the authenticated agent owns the property
    if (property.agent.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await property.remove();
    res.status(200).json({ message: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};