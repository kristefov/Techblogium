/* This code is importing the `Router` module from the `express` package and creating a new instance of
it called `router`. It is also importing the `User` model from the `../../models` directory. */
const router = require("express").Router();
const { User, Comment } = require("../../models");

/* This code is defining a route for handling a POST request to the root URL ("/"). When a POST request
is made to this route, it creates a new user in the database using the `User.create()` method and
the data from the request body (`req.body`). If the user is successfully created, it saves the
user's ID and sets the `logged_in` property to `true` in the session object. It then sends a JSON
response with the user data and renders the "homepage" view. If there is an error creating the user,
it sends a JSON response with the error message and a 400 status code. */
router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
      res.render("homepage")
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

/* This code is defining a route for handling a POST request to the "/login" URL. When a POST request
is made to this route, it first tries to find a user in the database with the email provided in the
request body (`req.body.email`) using the `User.findOne()` method. If no user is found, it sends a
JSON response with a "Incorrect username or password" message and a 404 status code. If a user is
found, it checks if the password provided in the request body (`req.body.password`) matches the
user's password using the `userData.checkPassword()` method. If the password is incorrect, it sends
a JSON response with a "Incorrect username or password" message and a 404 status code. If the
password is correct, it saves the user's ID, sets the `logged_in` property to `true`, and saves the
user data in the session object using `req.session.save()`. It then sends a JSON response with the
user data and a "You are now logged in!" message. If there is an error, it sends a JSON response
with the error message and a 400 status code. */
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { email: req.body.email },
    });
    if (!userData) {
      res.status(404).json({ message: "Incorrect username or password." });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(404).json({ message: "Incorrect username or password." });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.user = userData;
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

/* This code is defining a route for handling a POST request to the "/logout" URL. When a POST request
is made to this route, it first checks if the user is logged in by checking the `logged_in` property
in the session object (`req.session.logged_in`). If the user is logged in, it destroys the session
using the `req.session.destroy()` method and sends a 204 status code (which means "No Content"). If
the user is not logged in, it sends a 404 status code (which means "Not Found"). This route is used
to log out the user by destroying their session. */
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

/* This code is defining a route for handling a GET request to the root URL ("/"). When a GET request
is made to this route, it retrieves all user data from the database using the `User.findAll()`
method and sends a JSON response with the user data and a 200 status code. If there is an error
retrieving the user data, it sends a JSON response with the error message and a 500 status code. */
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
