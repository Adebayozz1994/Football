const express = require('express');
const adminController = require('../controllers/adminController');
const { authenticateToken} = require('../middlewares/adminAuth');
const upload = require('../middlewares/uploads');

const router = express.Router();

router.post('/register', adminController.register);
router.post('/login', adminController.login);

// Protect this route with admin JWT auth
router.get('/profile', authenticateToken, adminController.getProfile);
// router.put('/profile', authenticateToken, adminController.updateAdminProfile);
router.put('/profile',authenticateToken, upload.single('avatar'),adminController.updateAdminProfile );
router.put("/change-password", authenticateToken, adminController.changePassword)
router.post("/forgot-password", adminController.forgotPassword)
router.post("/reset-password", adminController.resetPassword)

module.exports = router;
