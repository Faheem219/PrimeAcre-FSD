require('dotenv').config();

// app.js
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./config/database');
const propertyRoutes = require('./routes/propertyRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const flash = require('connect-flash');
const cors = require('cors');

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// CORS Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,  // Ensure this matches your frontend URL
    credentials: true,  // Allow cookies and other credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
  })
);

// Handle Preflight Requests for All Routes
app.options('*', cors()); 

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: false,
      sameSite: 'None',
    },
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Connect Flash
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.get('/', (req, res) => res.send('Backend is running!'));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/properties', propertyRoutes);
app.use('/properties', reviewRoutes); // Reviews are nested under properties

// Handle Errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));