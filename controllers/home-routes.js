const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/withAuth');

router.get('/', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });
        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        req.render("homepage", {
            blogs,
            logged_in: req.session.logged_in,
        }) 
    } catch (error) {
        res.status(500).json(error);

    }}


    router.get('/login', async (req, res) => {
        if (req.session.logged_in) {
            res.redirect("/");
            return;
        }
        res.render('login');
    });

    router.get('/signup', async (req, res) => {
        if (req.session.logged_in) {
            res.redirect("/");
            return;
        }
        res.render('register');
    })

    module.exports = router;