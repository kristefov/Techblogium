/* This code is creating a router object using the Express framework and defining routes for different
endpoints. It is importing and using other route files for handling requests related to users, user
blogs, and user comments. Finally, it exports the router object to be used in the main application
file. */
const router = require('express').Router();

const userRoutes = require('./user-routes');
router.use('/user', userRoutes);

const userBlogs = require('./user-blogs-routes');
router.use('/blogs', userBlogs);

const userComments = require('./user-comments-routes.js');
router.use('/comments', userComments);



module.exports = router;