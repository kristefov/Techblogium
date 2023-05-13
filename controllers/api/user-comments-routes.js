const router = require('express').Router();
const Comment = require("../../models/Comment");
const withAuth = require("../../utils/withAuth");

router.get("/", async (req, res) => { 
    try {
        const comments = await Comment.findAll();
        res.status(200).json(comments);

    } catch (err) {
        res.status(500).json(err); 
    }

});

router.post("/", withAuth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
        blog_id: req.blog_id
      });
      res.status(200).json(newComment);
    } catch (error) {
      res.status(400).json(error);
      console.log(error);
    }
  });

module.exports = router;
