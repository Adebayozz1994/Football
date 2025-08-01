const express = require('express');
const adminController = require('../controllers/adminController');
const { authenticateToken} = require('../middlewares/adminAuth');

const router = express.Router();

router.post('/register', adminController.register);
router.post('/login', adminController.login);

// Protect this route with admin JWT auth
router.get('/profile', authenticateToken, adminController.getProfile);
router.put('/profile', authenticateToken, adminController.updateAdminProfile);


// All admin routes require authentication
// router.use(authenticateToken);

// // User management
// router.get('/users', authorize('admin', 'super_admin'), adminController.getUsers);
// router.get('/users/:id', authorize('admin', 'super_admin'), adminController.getUserById);
// router.put('/users/:id', authorize('admin', 'super_admin'), adminController.updateUser);
// router.put('/users/:id/ban', authorize('admin', 'super_admin'), adminController.banUser);
// router.put('/users/:id/unban', authorize('admin', 'super_admin'), adminController.unbanUser);
// router.put('/users/:id/reset-password', authorize('admin', 'super_admin'), adminController.resetUserPassword);
// router.delete('/users/:id', authorize('super_admin'), adminController.deleteUser);

// // Team management
// router.get('/teams', authorizeStateAdmin, adminController.getTeams);
// router.post('/teams', authorizeStateAdmin, adminController.createTeam);
// router.get('/teams/:id', authorizeStateAdmin, adminController.getTeamById);
// router.put('/teams/:id', authorizeStateAdmin, adminController.updateTeam);
// router.delete('/teams/:id', authorizeStateAdmin, adminController.deleteTeam);

// // Player management
// router.get('/players', authorizeStateAdmin, adminController.getPlayers);
// router.post('/players', authorizeStateAdmin, adminController.createPlayer);
// router.get('/players/:id', authorizeStateAdmin, adminController.getPlayerById);
// router.put('/players/:id', authorizeStateAdmin, adminController.updatePlayer);
// router.delete('/players/:id', authorizeStateAdmin, adminController.deletePlayer);

// // Match management
// router.get('/matches', authorizeStateAdmin, adminController.getMatches);
// router.post('/matches', authorizeStateAdmin, adminController.createMatch);
// router.get('/matches/:id', authorizeStateAdmin, adminController.getMatchById);
// router.put('/matches/:id', authorizeStateAdmin, adminController.updateMatch);
// router.delete('/matches/:id', authorizeStateAdmin, adminController.deleteMatch);

// // Match events
// router.post('/matches/:id/events', authorizeStateAdmin, adminController.addMatchEvent);
// router.put('/matches/:matchId/events/:eventId', authorizeStateAdmin, adminController.updateMatchEvent);
// router.delete('/matches/:matchId/events/:eventId', authorizeStateAdmin, adminController.deleteMatchEvent);

// // Match status
// router.put('/matches/:id/status', authorizeStateAdmin, adminController.updateMatchStatus);
// router.put('/matches/:id/score', authorizeStateAdmin, adminController.updateMatchScore);

// // News management
// router.get('/news', authorize('admin', 'super_admin', 'news_admin'), adminController.getNews);
// router.post('/news', authorize('admin', 'super_admin', 'news_admin'), adminController.createNews);
// router.get('/news/:id', authorize('admin', 'super_admin', 'news_admin'), adminController.getNewsById);
// router.put('/news/:id', authorize('admin', 'super_admin', 'news_admin'), adminController.updateNews);
// router.delete('/news/:id', authorize('admin', 'super_admin', 'news_admin'), adminController.deleteNews);
// router.put('/news/:id/publish', authorize('admin', 'super_admin', 'news_admin'), adminController.publishNews);
// router.put('/news/:id/unpublish', authorize('admin', 'super_admin', 'news_admin'), adminController.unpublishNews);

// // Dashboard statistics
// router.get('/dashboard/stats', authorize('admin', 'super_admin', 'state_admin', 'news_admin'), adminController.getDashboardStats);
// router.get('/dashboard/recent-activity', authorize('admin', 'super_admin', 'state_admin', 'news_admin'), adminController.getRecentActivity);

// // Notifications
// router.post('/notifications/send', authorize('admin', 'super_admin'), adminController.sendNotification);
// router.get('/notifications/history', authorize('admin', 'super_admin'), adminController.getNotificationHistory);

// // Analytics
// router.get('/analytics/users', authorize('admin', 'super_admin'), adminController.getUserAnalytics);
// router.get('/analytics/matches', authorize('admin', 'super_admin', 'state_admin'), adminController.getMatchAnalytics);
// router.get('/analytics/news', authorize('admin', 'super_admin', 'news_admin'), adminController.getNewsAnalytics);

module.exports = router;
