/* These lines of code are importing the necessary dependencies and middleware for the blog routes. */
const router = require("express").Router();
const { Blog , Comment } = require("../../models");
const withAuth = require("../../utils/withAuth");

/* This code defines a GET route for the root URL ("/") that retrieves all blog posts from the database
using the `Blog` model's `findAll` method. The retrieved data includes only the `id`, `title`,
`content`, and `date` attributes of each blog post, and is ordered by date in ascending order.
Additionally, the `Comment` model is included as an association to retrieve all comments associated
with each blog post. If the operation is successful, the retrieved data is sent as a JSON response
with a status code of 200. If an error occurs, a JSON response with a status code of 500 is sent
instead. */
router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      attributes: ["id", "title", "content", "date"],
      order: [["date", "ASC"]],
      include: {
        model: Comment
      }
    });
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* This code defines a GET route for the URL with a parameterized path ("/:id") that retrieves a single
blog post from the database using the `Blog` model's `findOne` method. The `id` parameter is
obtained from the request object's `params` property. If the operation is successful, the retrieved
data is sent as a JSON response with a status code of 200. If an error occurs, a JSON response with
a status code of 500 is sent instead. */
router.get("/:id", async (req, res) => {
  try {
    const blogData = await Blog.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* This code defines a POST route for the root URL ("/") that creates a new blog post in the database
using the `Blog` model's `create` method. The `withAuth` middleware is used to ensure that the user
is authenticated before creating a new blog post. The `req.body` object is spread into the `create`
method to create a new blog post with the `title`, `content`, and `date` attributes obtained from
the request body. Additionally, the `user_id` attribute is set to the `user_id` value stored in the
`req.session` object, which is obtained from the user's session data. If the operation is
successful, the newly created blog post data is sent as a JSON response with a status code of 200.
If an error occurs, a JSON response with a status code of 400 is sent instead. */
router.post("/", withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newBlog);
  } catch (error) {
    res.status(400).json(error);
  }
});

/* This code defines a PUT route for the URL with a parameterized path ("/:id") that updates a single
blog post in the database using the `Blog` model's `update` method. The `withAuth` middleware is
used to ensure that the user is authenticated before updating the blog post. The `id` parameter is
obtained from the request object's `params` property, and the updated blog post data is obtained
from the request body using the spread operator (`...req.body`). The `Blog` model's `update` method
is then called with the updated blog post data and a `where` clause that specifies the `id` of the
blog post to update. If the operation is successful, the updated blog post data is sent as a JSON
response with a status code of 200. If an error occurs, a JSON response with a status code of 400 is
sent instead. */
router.put("/:id", withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.update(req.body,{
      where: {
        id: req.params.id,
      }})
    res.status(200).json(newBlog);
  } catch (error) {
    console.error(error)
    res.status(400).json(error);
    console.error(error)
  }
});

/* This code defines a DELETE route for the URL with a parameterized path ("/:id") that deletes a
single blog post from the database using the `Blog` model's `destroy` method. The `withAuth`
middleware is used to ensure that the user is authenticated before deleting the blog post. The `id`
parameter is obtained from the request object's `params` property, and the `Blog` model's `destroy`
method is then called with a `where` clause that specifies the `id` of the blog post to delete. If
the operation is successful, a JSON response with a status code of 200 is sent. If the blog post
with the specified `id` is not found, a JSON response with a status code of 404 is sent instead. If
an error occurs, a JSON response with a status code of 500 is sent. Finally, the `router` object is
exported for use in other parts of the application. */
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!blogData) {
      res.status(404).json({ message: "No blog found with this id!" });
      return;
    }
    res.status(200).json(blogData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
