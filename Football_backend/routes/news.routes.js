// const express = require('express');
// const newsController = require('../controllers/newsController');
// const { optionalAuth, authenticateToken } = require('../middlewares/auth');

// const router = express.Router();

// // Public routes
// router.get('/', optionalAuth, newsController.getNews);
// router.get('/featured', optionalAuth, newsController.getFeaturedNews);
// router.get('/breaking', optionalAuth, newsController.getBreakingNews);
// router.get('/category/:category', optionalAuth, newsController.getNewsByCategory);
// router.get('/state/:state', optionalAuth, newsController.getNewsByState);
// router.get('/team/:teamId', optionalAuth, newsController.getNewsByTeam);
// router.get('/europe', optionalAuth, newsController.getEuropeNews);
// router.get('/search/:query', optionalAuth, newsController.searchNews);
// router.get('/:id', optionalAuth, newsController.getNewsById);
// router.get('/:id/related', optionalAuth, newsController.getRelatedNews);

// // Protected routes
// router.use(authenticateToken);
// router.post('/:id/like', newsController.likeNews);
// router.delete('/:id/like', newsController.unlikeNews);
// router.post('/:id/comments', newsController.addComment);
// router.put('/comments/:commentId', newsController.updateComment);
// router.delete('/comments/:commentId', newsController.deleteComment);
// router.post('/comments/:commentId/reply', newsController.replyToComment);

// module.exports = router;
