const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  homeTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  awayTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  matchDate: {
    type: Date,
    required: true
  },
  venue: {
    stadium: {
      type: String,
      required: true
    },
    city: String,
    state: String
  },
  status: {
    type: String,
    enum: ['scheduled', 'live', 'half_time', 'full_time', 'postponed', 'cancelled'],
    default: 'scheduled'
  },
  matchday: {
    type: Number,
    required: true
  },
  season: {
    type: String,
    required: true
  },
  league: {
    type: String,
    default: 'Nigerian State League'
  },
  score: {
    home: { type: Number, default: 0 },
    away: { type: Number, default: 0 }
  },
  events: [{
    type: {
      type: String,
      enum: ['goal', 'yellow_card', 'red_card', 'substitution', 'corner', 'penalty', 'own_goal'],
      required: true
    },
    minute: {
      type: Number,
      required: true,
      min: 1,
      max: 120
    },
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player'
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true
    },
    description: String,
    // For substitutions
    playerOut: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player'
    },
    playerIn: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player'
    }
  }],
  lineups: {
    home: {
      formation: String,
      startingXI: [{
        player: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Player'
        },
        position: String,
        jerseyNumber: Number
      }],
      substitutes: [{
        player: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Player'
        },
        position: String,
        jerseyNumber: Number
      }]
    },
    away: {
      formation: String,
      startingXI: [{
        player: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Player'
        },
        position: String,
        jerseyNumber: Number
      }],
      substitutes: [{
        player: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Player'
        },
        position: String,
        jerseyNumber: Number
      }]
    }
  },
  stats: {
    possession: {
      home: { type: Number, min: 0, max: 100 },
      away: { type: Number, min: 0, max: 100 }
    },
    shots: {
      home: { type: Number, default: 0 },
      away: { type: Number, default: 0 }
    },
    shotsOnTarget: {
      home: { type: Number, default: 0 },
      away: { type: Number, default: 0 }
    },
    corners: {
      home: { type: Number, default: 0 },
      away: { type: Number, default: 0 }
    },
    fouls: {
      home: { type: Number, default: 0 },
      away: { type: Number, default: 0 }
    },
    yellowCards: {
      home: { type: Number, default: 0 },
      away: { type: Number, default: 0 }
    },
    redCards: {
      home: { type: Number, default: 0 },
      away: { type: Number, default: 0 }
    }
  },
  referee: {
    name: String,
    nationality: String
  },
  attendance: Number,
  weather: {
    temperature: Number,
    condition: String,
    humidity: Number
  },
  notes: String,
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Validate that home and away teams are different
matchSchema.pre('save', function(next) {
  if (this.homeTeam.toString() === this.awayTeam.toString()) {
    next(new Error('Home team and away team cannot be the same'));
  }
  next();
});

// Virtual for match result
matchSchema.virtual('result').get(function() {
  if (this.status !== 'full_time') return null;
  
  if (this.score.home > this.score.away) return 'home_win';
  if (this.score.away > this.score.home) return 'away_win';
  return 'draw';
});

// Add event to match
matchSchema.methods.addEvent = function(eventData) {
  this.events.push(eventData);
  
  // Update score if it's a goal
  if (eventData.type === 'goal' || eventData.type === 'own_goal') {
    if (eventData.team.toString() === this.homeTeam.toString()) {
      this.score.home += 1;
    } else {
      this.score.away += 1;
    }
  }
  
  // Update card stats
  if (eventData.type === 'yellow_card') {
    if (eventData.team.toString() === this.homeTeam.toString()) {
      this.stats.yellowCards.home += 1;
    } else {
      this.stats.yellowCards.away += 1;
    }
  }
  
  if (eventData.type === 'red_card') {
    if (eventData.team.toString() === this.homeTeam.toString()) {
      this.stats.redCards.home += 1;
    } else {
      this.stats.redCards.away += 1;
    }
  }
  
  return this.save();
};

module.exports = mongoose.model('Match', matchSchema);
