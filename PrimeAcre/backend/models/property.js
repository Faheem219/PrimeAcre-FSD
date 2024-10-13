const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
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
  location: {
    type: String,
    required: true,
  },
  size: {
    type: Number, // In square feet
  },
  bedrooms: {
    type: Number,
  },
  bathrooms: {
    type: Number,
  },
  propertyType: {
    type: String,
    enum: ['Apartment', 'House', 'Condo', 'Land', 'Commercial'],
    required: true,
  },
  status: {
    type: String,
    enum: ['Available', 'Sold', 'Pending'],
    default: 'Available',
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  }],
  images: [{
    type: String, // URL of property images
  }],
  dateListed: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;