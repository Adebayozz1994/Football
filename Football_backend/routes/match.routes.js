// const express = require('express');
// const matchController = require('../controllers/matchController');
// const { optionalAuth, authenticateToken } = require('../middlewares/auth');

// const router = express.Router();

// // Public routes
// router.get('/', optionalAuth, matchController.getMatches);
// router.get('/upcoming', optionalAuth, matchController.getUpcomingMatches);
// router.get('/live', optionalAuth, matchController.getLiveMatches);
// router.get('/results', optionalAuth, matchController.getMatchResults);
// router.get('/by-state/:state', optionalAuth, matchController.getMatchesByState);
// router.get('/by-team/:teamId', optionalAuth, matchController.getMatchesByTeam);
// router.get('/:id', optionalAuth, matchController.getMatchById);
// router.get('/:id/events', optionalAuth, matchController.getMatchEvents);
// router.get('/:id/lineups', optionalAuth, matchController.getMatchLineups);
// router.get('/:id/stats', optionalAuth, matchController.getMatchStats);

// // Search and filter
// router.get('/search/:query', optionalAuth, matchController.searchMatches);
// router.get('/filter/date-range', optionalAuth, matchController.getMatchesByDateRange);

// // Protected routes (for notifications, favorites, etc.)
// router.use(authenticateToken);
// router.post('/:id/follow', matchController.followMatch);
// router.delete('/:id/follow', matchController.unfollowMatch);

// module.exports = router;
