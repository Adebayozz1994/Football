const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, trim: true },
  password: { type: String, required: true, minlength: 6 },
  role: {
    type: String,
    enum: ['user', 'state_admin', 'news_admin'],
    default: 'user'
  },
  state: { type: String, required: function() { return this.role === 'state_admin'; } },
  avatar: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  isBanned: { type: Boolean, default: false },
  followedTeams: [String],   // Store team names as string for now
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
userSchema.pre('save', async function(next) {
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
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Get public profile
userSchema.methods.getPublicProfile = function() {
  const user = this.toObject();
  delete user.password;
  delete user.passwordResetToken;
  delete user.passwordResetExpires;
  return user;
};

module.exports = mongoose.model('User', userSchema);