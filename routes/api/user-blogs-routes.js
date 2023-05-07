const router = require("express").Router();
const Blog = require("../../models/Blog");

router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll(req.body);
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;