// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/auth');

// Profile routes
router.get('/profile', isAuthenticated, userController.getUserProfile);
router.patch('/profile', isAuthenticated, userController.updateUserProfile);
router.delete('/profile', isAuthenticated, userController.deleteUserAccount);

module.exports = router;