const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const { authenticateToken } = require('../middlewares/adminAuth');

// Public routes
router.get('/', matchController.getAllMatches); 
router.get('/competitions', matchController.getCompetitions);
router.get('/states', matchController.getStates);
router.get('/:id', matchController.getMatchById);

// Protected routes (admin only)
router.post('/', authenticateToken, matchController.createMatch);
router.put('/:id', authenticateToken, matchController.updateMatch);
router.patch('/:id/score', authenticateToken, matchController.updateScore);

router.post('/:id/events', authenticateToken, matchController.addEvent);
router.delete('/:id/events/:eventIndex', authenticateToken, matchController.deleteEvent);

router.patch('/:id/finish', authenticateToken, matchController.markFinished);
router.patch('/:id/schedule', authenticateToken, matchController.markScheduled);
router.patch('/:id/live', authenticateToken, matchController.markLive);

router.delete('/:id', authenticateToken, matchController.deleteMatch);

module.exports = router;