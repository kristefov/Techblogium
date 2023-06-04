/* This code is importing necessary modules and dependencies for the router to work properly. */
const router = require("express").Router();
const { User, Blog, Comment } = require("../models");
const withAuth = require("../utils/withAuth");
const util = require('util')

/* This code defines a route for the "/dashboard" endpoint using the HTTP GET method. It uses the
withAuth middleware to ensure that only authenticated users can access the dashboard. */
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: {
        user_id: req.session.user_id,
      },
      order: [["date", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["email", "first_name", "last_name"],
        },
        {
          model: Comment,
        },
      ],
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render("dashboard", {
      user: req.session.user,
      blogs,
      logged_in: req.session.logged_in,
    });
    console.log(req.body);
  } catch (error) {
    res.status(500).json(error);
  }
});


/* This code defines a route for the "/login" endpoint using the HTTP GET method. If the user is
already logged in (checked using the `req.session.logged_in` property), the user is redirected to
the dashboard page. Otherwise, the login page is rendered using the `res.render()` method. */
router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});
/* This code defines a route for the "/newblog" endpoint using the HTTP GET method. If the user is
logged in (checked using the `req.session.logged_in` property), the "newblog" page is rendered using
the `res.render()` method and passing the user's information and logged_in status as variables. If
the user is not logged in, the user is redirected to the login page using the `res.render()` method. */
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

/* This code defines a route for the "/signup" endpoint using the HTTP GET method. If the user is
already logged in (checked using the `req.session.logged_in` property), the user is redirected to
the dashboard page. Otherwise, the "register" page is rendered using the `res.render()` method. */
router.get("/signup", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("register");
});

/* This code defines a route for the "/homepage" endpoint using the HTTP GET method. If the user is
logged in (checked using the `req.session.logged_in` property), it retrieves all blog data from the
database, including the associated user and comments, and renders the "homepage" template with the
blog data, user information, and logged_in status as variables. If the user is not logged in, it
retrieves all blog and comment data from the database, renders the "homepage" template with the blog
and comment data as variables. */
router.get("/homepage", async (req, res) => {
  if (req.session.logged_in) {
    const blogData = await Blog.findAll({
      order: [["date", "DESC"]],
      include: [
        {
          model: User,
          
        },
        {
          model: Comment,
        
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

/* This code defines a route for the "/homepage/:id" endpoint using the HTTP GET method. It retrieves a
single blog post from the database based on the id parameter in the URL using the `Blog.findOne()`
method. It includes the associated user and comments using the `include` option. It then renders the
"singleblog" template with the blog data, user information, logged_in status, and a boolean value
indicating whether the current user is the creator of the blog post. If an error occurs, it sends a
500 status code and the error message as a JSON object. */
router.get("/homepage/:id", async (req, res) => {
  
    try {
      const blogData = await Blog.findOne({
        where: {
          id: req.params.id,
        },
        include: [User, { model: Comment, include: [User] }],
      });

      const blogs = blogData.get({ plain: true });
      console.log(util.inspect(blogs, {showHidden: false, depth: 10, colors: true}));
      res.render("singleBlog", {
        user: req.session.user,
        blogs,
        logged_in: req.session.logged_in,
        is_creator: blogs.user.id === req.session.user_id
      });
    } catch (error) {
      res.status(500).json(error);
    }
  
});

/* This code defines a catch-all route that redirects any request to an undefined endpoint to the
homepage ("/homepage") using the `res.redirect()` method. The `*` symbol is a wildcard that matches
any endpoint that has not been defined in the router. The `module.exports = router;` statement
exports the router object so that it can be used in other parts of the application. */
router.get("*", async (req, res) => {
  
  res.redirect("/homepage");
});
module.exports = router;
