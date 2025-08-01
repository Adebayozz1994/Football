const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, trim: true },
  password: { type: String, required: true, minlength: 6 },
  role: {
    type: String,
    enum: ['admin', 'super_admin', 'state_admin', 'news_admin'],
    default: 'admin'
  },
  state: { type: String },
  avatar: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  isBanned: { type: Boolean, default: false },
  followedTeams: [String],
  followedStates: [String],
  preferences: {
    darkMode: { type: Boolean, default: false },
    notifications: {
      matchUpdates: { type: Boolean, default: true },
      newsUpdates: { type: Boolean, default: true },
      teamUpdates: { type: Boolean, default: true }
    }
  },
  lastLogin: Date,
  passwordResetToken: String,
  passwordResetExpires: Date
}, { timestamps: true });

// Hash password before saving
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
adminSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Get public profile
adminSchema.methods.getPublicProfile = function() {
  const admin = this.toObject();
  delete admin.password;
  delete admin.passwordResetToken;
  delete admin.passwordResetExpires;
  return admin;
};

module.exports = mongoose.model('Admin', adminSchema);