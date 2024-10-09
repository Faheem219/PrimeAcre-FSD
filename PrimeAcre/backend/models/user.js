const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['Agent', 'Client'],
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    agency: {
      type: String, // Only applicable for agents
    },
    properties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
      },
    ],
    interestedProperties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
      },
    ],
  },
  { timestamps: true }
);

// Plugin for passport-local-mongoose
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

// Check if the model is already compiled
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;