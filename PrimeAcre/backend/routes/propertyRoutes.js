// routes/propertyRoutes.js
const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { isAuthenticated, isAgent } = require('../middleware/auth');

// Public routes
router.get('/', propertyController.getAllProperties);
router.get('/:id', propertyController.getPropertyById);

// Protected routes (Agent only)
router.post(
  '/',
  isAuthenticated,
  isAgent,
  propertyController.uploadImages,
  propertyController.createProperty
);
router.patch(
  '/:id',
  isAuthenticated,
  isAgent,
  propertyController.uploadImages,
  propertyController.updateProperty
);
router.delete('/:id', isAuthenticated, isAgent, propertyController.deleteProperty);
router.post('/:propertyId/interested', isAuthenticated, propertyController.markPropertyAsInterested);

module.exports = router;