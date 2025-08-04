const express = require('express');
const userController = require('../controllers/userController');
const { authenticateToken, optionalAuth, rateLimit } = require('../middlewares/auth');
const upload = require('../middlewares/uploads');

const router = express.Router();

// Public routes
router.post('/register', rateLimit(15 * 60 * 1000, 5), userController.register);
router.post('/login', rateLimit(15 * 60 * 1000, 10), userController.login);
router.post('/forgot-password', rateLimit(15 * 60 * 1000, 3), userController.forgotPassword);
router.post('/reset-password', rateLimit(15 * 60 * 1000, 3), userController.resetPassword);
router.post('/social-login', rateLimit(15 * 60 * 1000, 10), userController.socialLogin);

// Protected routes
router.use(authenticateToken);

router.get('/profile', userController.getProfile);
router.put('/profile', authenticateToken, upload.single('avatar'), userController.updateProfile);
router.put('/change-password', userController.changePassword);
router.post('/upload-avatar', userController.uploadAvatar);
router.delete('/delete-account', userController.deleteAccount);

// Follow/Unfollow
router.post('/follow-team/:teamId', userController.followTeam);
router.delete('/unfollow-team/:teamId', userController.unfollowTeam);
router.post('/follow-state/:state', userController.followState);
router.delete('/unfollow-state/:state', userController.unfollowState);

// Preferences
router.put('/preferences', userController.updatePreferences);
router.get('/preferences', userController.getPreferences);

// Notifications
router.get('/notifications', userController.getNotifications);
router.put('/notifications/:id/read', userController.markNotificationAsRead);
router.delete('/notifications/:id', userController.deleteNotification);

module.exports = router;
