const router = require("express").Router();
const { Model, where } = require("sequelize");
const { Blog } = require("../../models");
const withAuth = require("../../utils/withAuth");

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
