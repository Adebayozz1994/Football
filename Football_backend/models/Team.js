const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  shortName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 5
  },
  logo: {
    type: String,
    default: ''
  },
  state: {
    type: String,
    required: true,
    enum: [
      'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 
      'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 
      'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 
      'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 
      'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara', 'FCT'
    ]
  },
  founded: {
    type: Number,
    min: 1900,
    max: new Date().getFullYear()
  },
  stadium: {
    name: String,
    capacity: Number,
    city: String
  },
  description: {
    type: String,
    maxlength: 1000
  },
  colors: {
    primary: String,
    secondary: String
  },
  coach: {
    name: String,
    nationality: String,
    photo: String
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  },
  squad: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  }],
  stats: {
    matchesPlayed: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    draws: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    goalsFor: { type: Number, default: 0 },
    goalsAgainst: { type: Number, default: 0 },
    points: { type: Number, default: 0 }
  },
  socialMedia: {
    website: String,
    facebook: String,
    twitter: String,
    instagram: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Virtual for goal difference
teamSchema.virtual('goalDifference').get(function() {
  return this.stats.goalsFor - this.stats.goalsAgainst;
});

// Update team stats after match
teamSchema.methods.updateStats = function(goalsFor, goalsAgainst, isWin, isDraw) {
  this.stats.matchesPlayed += 1;
  this.stats.goalsFor += goalsFor;
  this.stats.goalsAgainst += goalsAgainst;
  
  if (isWin) {
    this.stats.wins += 1;
    this.stats.points += 3;
  } else if (isDraw) {
    this.stats.draws += 1;
    this.stats.points += 1;
  } else {
    this.stats.losses += 1;
  }
  
  return this.save();
};

module.exports = mongoose.model('Team', teamSchema);
