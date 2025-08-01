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
  state: { type: String, required: function() { return this.role === 'state_admin'; } },
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
  passwordResetExpires: Date,

  // --- Extended Profile Fields ---
  bio: { type: String, trim: true, default: '' },
  socialLinks: {
    twitter: { type: String, trim: true, default: '' },
    facebook: { type: String, trim: true, default: '' },
    instagram: { type: String, trim: true, default: '' },
    linkedin: { type: String, trim: true, default: '' },
    website: { type: String, trim: true, default: '' },
  },
  birthdate: { type: Date },
  gender: { type: String, enum: ['', 'male', 'female', 'other'], default: '' },
  location: { type: String, trim: true, default: '' },
  address: { type: String, trim: true, default: '' },
  theme: { type: String, enum: ['light', 'dark', 'system'], default: 'system' },
  language: { type: String, default: 'en' },
  achievements: [{ type: String }],
  badges: [{ type: String }],
  favoritePlayers: [{ type: String }],
  favoriteLeagues: [{ type: String }],
  profileUpdatedAt: { type: Date },
  coverPhoto: { type: String, default: '' },
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