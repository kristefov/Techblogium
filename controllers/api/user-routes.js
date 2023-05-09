const router = require("express").Router();
const Users = require("../../models/User");

router.get("/", async (req, res) => {
  try {
    const userData = await Users.findAll(req.body);
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
