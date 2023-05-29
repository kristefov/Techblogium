/* These lines of code are importing necessary dependencies and middleware for the comments routes in
an Express.js application. */
const router = require("express").Router();
const { Comment, Blog, User } = require("../../models");
const withAuth = require("../../utils/withAuth");

/* This code defines a GET route for the comments endpoint ("/"). When a GET request is made to this
endpoint, it uses the `Comment` model to find all comments in the database and includes the
associated `Blog` and `User` models. If successful, it responds with a JSON object containing the
comments and a status code of 200. If there is an error, it logs the error to the console and
responds with a status code of 500. */
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [
        {
          model: Blog,
        },
        {
          model: User,
        },
      ],
    });
    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

/* This code defines a GET route for the comments endpoint with a dynamic parameter `:id`. When a GET
request is made to this endpoint with a specific `id` value, it uses the `Comment` model to find all
comments in the database that match the `id` value and includes the associated `Blog` and `User`
models. If successful, it responds with a JSON object containing the comments and a status code of
200. If there is an error, it logs the error to the console and responds with a status code of 500. */
router.get("/:id", async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* This code defines a POST route for the comments endpoint ("/"). When a POST request is made to this
endpoint, it uses the `Comment` model to create a new comment in the database with the data provided
in the request body. It also includes the `user_id` of the currently logged in user, which is stored
in the `req.session.user_id` property. If the comment is successfully created, it responds with a
JSON object containing the new comment and a status code of 200. If there is an error, it logs the
error to the console and responds with a status code of 400. The `withAuth` middleware is used to
ensure that only authenticated users can create comments. Finally, the `router` object is exported
to be used in other parts of the application. */
router.post("/", withAuth, async (req, res) => {
  try {
    console.log(req.body);
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      
    });
    res.status(200).json(newComment);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});

module.exports = router;
