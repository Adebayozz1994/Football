const Match = require("../models/Match");
const { broadcastMatchUpdate } = require("../index");

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

const validEventTypes = [
  "goal", "yellow_card", "red_card", "substitution",
  "penalty", "own_goal", "assist", "injury", "start", "end"
];

// CREATE a new match
const createMatch = async (req, res) => {
  try {
    const { homeTeam, awayTeam, matchDate, matchTime, venue, state, competition } = req.body;
    if (!homeTeam || !awayTeam || !matchDate || !state) {
      return res.status(400).json({ message: "Home team, away team, match date, and state are required" });
    }
    if (!NIGERIAN_STATES.includes(state)) {
      return res.status(400).json({ message: "Invalid Nigerian state" });
    }
    if (competition && !COMPETITIONS.includes(competition)) {
      return res.status(400).json({ message: "Invalid competition" });
    }
    const match = new Match({ homeTeam, awayTeam, matchDate, matchTime, venue, state, competition: competition || "NPFL" });
    await match.save();
    res.status(201).json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE entire match (for admin only)
const updateMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;
    if (updateFields.state && !NIGERIAN_STATES.includes(updateFields.state)) {
      return res.status(400).json({ message: "Invalid Nigerian state" });
    }
    const match = await Match.findByIdAndUpdate(id, updateFields, { new: true, runValidators: true });
    if (!match) return res.status(404).json({ message: "Match not found" });
    
    // If score or status was updated, broadcast via WebSocket
    if (updateFields.homeScore !== undefined || updateFields.awayScore !== undefined || updateFields.status !== undefined) {
      const team = updateFields.homeScore !== undefined ? 'home' : 'away';
      broadcastMatchUpdate(id, team, {
        homeScore: match.homeScore,
        awayScore: match.awayScore,
        status: match.status
      });
    }
    res.json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE match score only
const updateScore = async (req, res) => {
  try {
    const { id } = req.params;
    const { homeScore, awayScore } = req.body;
    
    // Validate scores
    if (homeScore === undefined && awayScore === undefined) {
      return res.status(400).json({ message: "At least one score must be provided" });
    }
    
    if ((homeScore !== undefined && !Number.isInteger(homeScore)) || 
        (awayScore !== undefined && !Number.isInteger(awayScore))) {
      return res.status(400).json({ message: "Scores must be integers" });
    }
    
    if ((homeScore !== undefined && homeScore < 0) || 
        (awayScore !== undefined && awayScore < 0)) {
      return res.status(400).json({ message: "Scores cannot be negative" });
    }

    const match = await Match.findById(id);
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    // Update scores only if they are provided
    if (homeScore !== undefined) match.homeScore = homeScore;
    if (awayScore !== undefined) match.awayScore = awayScore;

    const updatedMatch = await match.save();
    
    try {
      // Broadcast score update via WebSocket
      broadcastMatchUpdate(id, homeScore !== undefined ? 'home' : 'away', {
        homeScore: updatedMatch.homeScore,
        awayScore: updatedMatch.awayScore,
        status: updatedMatch.status
      });
    } catch (wsError) {
      console.error('WebSocket broadcast error:', wsError);
    }
    
    res.json(updatedMatch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD event to match
const addEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { minute, type, team, player, description } = req.body;

    if (!Number.isInteger(minute) || minute < 0) {
      return res.status(400).json({ message: "Minute must be a positive integer" });
    }
    if (!validEventTypes.includes(type)) {
      return res.status(400).json({ message: "Invalid event type" });
    }
    if (!["home", "away"].includes(team)) {
      return res.status(400).json({ message: "Team must be 'home' or 'away'" });
    }

    const match = await Match.findById(id);
    if (!match) return res.status(404).json({ message: "Match not found" });

    const newEvent = { minute, type, team, player, description };
    match.events.push(newEvent);

    // Auto-update score for goals and own goals
    if (type === "goal") {
      if (team === "home") match.homeScore += 1;
      else match.awayScore += 1;
    }
    if (type === "own_goal") {
      if (team === "home") match.awayScore += 1;
      else match.homeScore += 1;
    }

    await match.save();
    res.json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE event from match (by event index)
const deleteEvent = async (req, res) => {
  try {
    const { id, eventIndex } = req.params;
    const match = await Match.findById(id);
    if (!match) return res.status(404).json({ message: "Match not found" });
    const idx = parseInt(eventIndex);

    if (idx < 0 || idx >= match.events.length) {
      return res.status(400).json({ message: "Invalid event index" });
    }

    const removedEvent = match.events[idx];
    // Undo score update for goals and own goals
    if (removedEvent.type === "goal") {
      if (removedEvent.team === "home" && match.homeScore > 0) match.homeScore -= 1;
      if (removedEvent.team === "away" && match.awayScore > 0) match.awayScore -= 1;
    }
    if (removedEvent.type === "own_goal") {
      if (removedEvent.team === "home" && match.awayScore > 0) match.awayScore -= 1;
      if (removedEvent.team === "away" && match.homeScore > 0) match.homeScore -= 1;
    }

    match.events.splice(idx, 1);
    await match.save();
    res.json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// MARK match as finished
const markFinished = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Match.findById(id);
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    match.status = "finished";
    const updatedMatch = await match.save();
    
    try {
      broadcastMatchUpdate(id, 'home', {
        homeScore: updatedMatch.homeScore,
        awayScore: updatedMatch.awayScore,
        status: updatedMatch.status
      });
    } catch (wsError) {
      console.error('WebSocket broadcast error:', wsError);
    }
    
    res.json(updatedMatch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// MARK match as scheduled
const markScheduled = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Match.findById(id);
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    match.status = "scheduled";
    const updatedMatch = await match.save();
    
    try {
      broadcastMatchUpdate(id, 'home', {
        homeScore: updatedMatch.homeScore,
        awayScore: updatedMatch.awayScore,
        status: updatedMatch.status
      });
    } catch (wsError) {
      console.error('WebSocket broadcast error:', wsError);
    }
    
    res.json(updatedMatch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// MARK match as live
const markLive = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Match.findById(id);
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    match.status = "live";
    const updatedMatch = await match.save();
    
    try {
      broadcastMatchUpdate(id, 'home', {
        homeScore: updatedMatch.homeScore,
        awayScore: updatedMatch.awayScore,
        status: updatedMatch.status
      });
    } catch (wsError) {
      console.error('WebSocket broadcast error:', wsError);
    }
    
    res.json(updatedMatch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all matches (with filtering and pagination)
const getAllMatches = async (req, res) => {
  try {
    const { status, state, competition, homeTeam, awayTeam, search, page = 1, limit = 20 } = req.query;
    let filter = {};
    
    // Filter by status
    if (status) filter.status = status;
    
    // Filter by state
    if (state) filter.state = state;
    
    // Filter by competition
    if (competition) filter.competition = competition;
    
    // Filter by team names
    if (homeTeam) filter.homeTeam = new RegExp(homeTeam, 'i');
    if (awayTeam) filter.awayTeam = new RegExp(awayTeam, 'i');
    
    // Search functionality
    if (search) {
      filter.$or = [
        { homeTeam: new RegExp(search, 'i') },
        { awayTeam: new RegExp(search, 'i') },
        { venue: new RegExp(search, 'i') },
        { competition: new RegExp(search, 'i') }
      ];
    }
    
    const matches = await Match.find(filter)
      .sort({ matchDate: -1 })
      .skip((page - 1) * parseInt(limit))
      .limit(parseInt(limit));
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET a single match by ID
const getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) return res.status(404).json({ message: "Match not found" });
    res.json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE a match
const deleteMatch = async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);
    if (!match) return res.status(404).json({ message: "Match not found" });
    res.json({ message: "Match deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all competitions
const getCompetitions = async (req, res) => {
  try {
    res.json(COMPETITIONS);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all states
const getStates = async (req, res) => {
  try {
    res.json(NIGERIAN_STATES);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMatch,
  updateMatch,
  updateScore,
  addEvent,
  deleteEvent,
  markFinished,
  markScheduled,
  markLive,
  getAllMatches,
  getMatchById,
  deleteMatch,
  getCompetitions,
  getStates
};