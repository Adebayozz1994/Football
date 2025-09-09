const mongoose = require("mongoose");

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT",
  "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi",
  "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo",
  "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

const COMPETITIONS = [
  "Orumogege Football Competition",
  "Olufem Presenter Football Competition",
  "U17 Friendly Tournament",
  "UNICEF Awareness Tournament",
  "Twindad Cup",
  "Jodelapo Football Competition",
  "Solmed Foundation Sunday Set Competition",
  "Club Friendly",
  "Vocational Football Tournament"
];

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
  state: {
    type: String,
    enum: NIGERIAN_STATES,
    required: true
  },
  competition: {
    type: String,
    enum: COMPETITIONS,
    required: true,
    default: "Orumogege Football Competition"
  },
  matchDate: { type: Date, required: true },
  matchTime: { type: String }, 
  venue: { type: String },
  events: [eventSchema]
}, { timestamps: true });

module.exports = mongoose.model("Match", matchSchema);