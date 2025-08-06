const mongoose = require("mongoose");

// Football event schema
const eventSchema = new mongoose.Schema({
  minute: { 
    type: Number, 
    required: true,
    min: [0, "Minute must be a positive integer"]
  },
  type: {
    type: String,
    enum: [
      "goal", "yellow_card", "red_card", "substitution",
      "penalty", "own_goal", "assist", "injury", "start", "end"
    ],
    required: true
  },
  team: { type: String, enum: ["home", "away"], required: true },
  player: { type: String },
  description: { type: String }
}, { _id: false });

const matchSchema = new mongoose.Schema({
  homeTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
  homeScore: { type: Number, default: 0 },
  awayScore: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["scheduled", "live", "finished"],
    default: "scheduled"
  },
  matchDate: { type: Date, required: true },
  matchTime: { type: String }, 
  venue: { type: String },
  events: [eventSchema]
}, { timestamps: true });

module.exports = mongoose.model("Match", matchSchema);