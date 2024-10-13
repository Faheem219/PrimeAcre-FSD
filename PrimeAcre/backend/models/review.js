const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
  },
  edit: {
    type: Boolean,
    default: false, // Track if the review was edited
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;