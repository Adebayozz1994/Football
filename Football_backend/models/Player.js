const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  jerseyNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 99
  },
  position: {
    type: String,
    required: true,
    enum: ['GK', 'CB', 'LB', 'RB', 'CDM', 'CM', 'CAM', 'LM', 'RM', 'LW', 'RW', 'CF', 'ST']
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  height: {
    type: Number, // in cm
    min: 150,
    max: 220
  },
  weight: {
    type: Number, // in kg
    min: 50,
    max: 120
  },
  photo: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    maxlength: 500
  },
  stats: {
    appearances: { type: Number, default: 0 },
    goals: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    yellowCards: { type: Number, default: 0 },
    redCards: { type: Number, default: 0 },
    minutesPlayed: { type: Number, default: 0 }
  },
  marketValue: {
    type: Number,
    default: 0
  },
  contractExpiry: Date,
  isActive: {
    type: Boolean,
    default: true
  },
  isInjured: {
    type: Boolean,
    default: false
  },
  injuryDetails: {
    type: String,
    description: String,
    expectedReturn: Date
  }
}, {
  timestamps: true
});

// Virtual for age
playerSchema.virtual('age').get(function() {
  if (!this.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
});

// Virtual for full name
playerSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Ensure jersey number is unique within team
playerSchema.index({ team: 1, jerseyNumber: 1 }, { unique: true });

module.exports = mongoose.model('Player', playerSchema);
