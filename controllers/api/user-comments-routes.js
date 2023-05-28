const router = require("express").Router();
const { Comment, Blog, User } = require("../../models");
const withAuth = require("../../utils/withAuth");

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
