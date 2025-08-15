const express = require('express');
const userController = require('../controllers/userController');
const { authenticateToken, rateLimit } = require('../middlewares/auth');
const upload = require('../middlewares/uploads');

const router = express.Router();

// Public routes
router.post('/register', rateLimit(15 * 60 * 1000, 5), userController.register);
router.post('/login', rateLimit(15 * 60 * 1000, 10), userController.login);
router.post('/forgot-password', rateLimit(15 * 60 * 1000, 3), userController.forgotPassword);
router.post('/reset-password', rateLimit(15 * 60 * 1000, 3), userController.resetPassword);


// Protected routes
router.use(authenticateToken);

router.get('/profile', userController.getProfile);
router.put('/profile', authenticateToken, upload.single('avatar'), userController.updateProfile);
router.put('/change-password', userController.changePassword);


module.exports = router;
