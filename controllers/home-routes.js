const router = require("express").Router();
const { User, Blog, Comment } = require("../models");
const withAuth = require("../utils/withAuth");

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ["email", "first_name", "last_name"],
        },
      ],
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    console.log(req.session.user);
    res.render("dashboard", {
      user: req.session.user,
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});


router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});
router.get("/newblog", async (req, res) => {
  if (req.session.logged_in) {
    res.render("newblog", {
      user: req.session.user,
      logged_in: req.session.logged_in,
    });
    return;
  }
  res.render("login");
});

router.get("/signup", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("register");
});

router.get("/homepage", async (req, res) => {
  if (req.session.logged_in) {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["first_name", "last_name"],
        },
        {
          model: Comment,
          attributes: ["content"],
        },
      ],
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render("homepage", {
      user: req.session.user,
      blogs,
      logged_in: req.session.logged_in,
    });
  } else {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["first_name", "last_name"],
        },
      ],
    });
    const commentData = await Comment.findAll();
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    const comments = commentData.map((comment) => comment.get({ plain: true }));
    res.render("homepage", {
      blogs,
      comments,
    });
  }
});

router.get("/singleBlog/:id", withAuth, async (req, res) => {
  console.log(req.params.id);
  try {
    const blogData = await Blog.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'content',
            
            
        ],
        include: [{
            model: Comment,
            attributes: [
                'id',
                'content',
                'blog_id',
                'user_id',
                
            ],
            include: {
                model: User,
                attributes: ['first_name', 'last_name']
            }
        },
        {
            model: User,
            attributes: ['first_name', 'last_name']
        }]
    })
    
    const blogs = blogData.get({ plain: true });
    console.log(blogs);
    res.render("singleBlog", {
      user: req.session.user,
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});


router.get("*", async (req, res) => {
  // const blogData = await Blog.findAll({
  //   include: [
  //     {
  //       model: User,
  //       attributes: ["first_name", "last_name"],
  //     },
  //   ],
  // });
  // const commentData = await Comment.findAll();
  // const blogs = blogData.map((blog) => blog.get({ plain: true }));
  // const comments = commentData.map((comment) => comment.get({ plain: true }));
  // res.render("homepage", {
  //   blogs,
  //   comments,
  // });
  res.render("homepage");
});
module.exports = router;
