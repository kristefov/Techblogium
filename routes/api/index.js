const router = require('express').Router();

const userRoutes = require('./user-routes');
router.use('/users', userRoutes);

const userBlogs = require('./user-blogs-routes');
router.use('/user-blogs', userBlogs);



module.exports = router;