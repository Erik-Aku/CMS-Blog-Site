const router = require('express').Router();

const blogPostRoutes = require('./blogPostRoutes');
const blogCommentRoutes = require('./blogCommentRoutes');
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);
router.use('/blogComments', blogCommentRoutes);
router.use('/blogPost', blogCommentRoutes);

module.exports = router;


