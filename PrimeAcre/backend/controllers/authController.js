// controllers/authController.js
const User = require('../models/user');
const passport = require('passport');

// Register a new user (Agent or Client)
exports.registerUser = async (req, res) => {
  try {
    const { email, password, role, firstName, lastName, phone, agency } = req.body;
    const userData = { email, role, firstName, lastName, phone };

    if (role === 'Agent') {
      userData.agency = agency;
    }

    const user = new User(userData);
    await User.register(user, password);
    res.status(201).json({ message: `${role} registered successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// User login
exports.loginUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    req.logIn(user, (err) => {
      if (err) return next(err);
      res.status(200).json({ message: `${user.role} logged in successfully` });
    });
  })(req, res, next);
};

// User logout
exports.logoutUser = (req, res) => {
  req.logout(() => {
    res.status(200).json({ message: 'Logged out successfully' });
  });
};

// Check authentication status
exports.checkAuthStatus = (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      isAuthenticated: true,
      user: {
        id: req.user._id,
        email: req.user.email,
        role: req.user.role,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
      },
    });
  } else {
    res.status(200).json({ isAuthenticated: false });
  }
};