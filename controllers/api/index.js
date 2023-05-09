const router = require('express').Router();

const userRoutes = require('./user-routes');
router.use('/users', userRoutes);

const userBlogs = require('./user-blogs-routes');
router.use('/blogs', userBlogs);

const userComments = require('./user-comments-routes.js');
router.use('/comments', userComments);



module.exports = router;