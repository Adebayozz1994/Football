const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const { authenticateToken } = require('../middlewares/adminAuth');
const upload = require('../middlewares/uploads');

// Public routes
router.get('/', newsController.getAllNews);
router.get('/states', newsController.getStates);
router.get('/:id', newsController.getNewsById);

// Protected routes (admin only)
router.post('/', authenticateToken, upload.single("image"), newsController.createNews);
router.put('/:id', authenticateToken, upload.single("image"), newsController.updateNews);
router.delete('/:id', authenticateToken, newsController.deleteNews);

module.exports = router;