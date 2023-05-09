const router = require('express').Router();
const userComments = require("../../models/Comment");

router.get("/", async (req, res) => { 
    try {
        const comments = await userComments.findAll();
        res.status(200).json(comments);

    } catch (err) {
        res.status(500).json(err); 
    }

});
module.exports = router;
