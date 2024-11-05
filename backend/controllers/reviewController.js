// controllers/reviewController.js
const Review = require('../models/review');
const Property = require('../models/property');

// Create a review
exports.createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const clientId = req.user.id; // Assuming client is authenticated
    const propertyId = req.params.id;

    const newReview = new Review({
      property: propertyId,
      client: clientId,
      rating,
      comment,
    });

    const savedReview = await newReview.save();

    // Add review to property
    const property = await Property.findById(propertyId);
    property.reviews.push(savedReview._id);
    await property.save();

    res.status(201).json(savedReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all reviews for a property
exports.getReviewsByProperty = async (req, res) => {
  try {
    const reviews = await Review.find({ property: req.params.id }).populate('client', 'firstName lastName');
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit a review
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Check if the authenticated client wrote the review
    if (review.client.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;
    review.edit = true;

    const updatedReview = await review.save();
    res.status(200).json(updatedReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Check if the authenticated client wrote the review or is an admin
    if (review.client.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await review.remove();

    // Remove review from property
    await Property.findByIdAndUpdate(review.property, {
      $pull: { reviews: review._id },
    });

    res.status(200).json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};