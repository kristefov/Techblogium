/* This code is creating a router object using the Express.js Router() method and then defining two
routes: one for the "/api" endpoint and one for the root endpoint ("/"). It then uses these routes
by calling the router.use() method and passing in the corresponding route and endpoint. Finally, it
exports the router object so that it can be used in other parts of the application. */
const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
router.use("/api", apiRoutes);
router.use("/", homeRoutes);

module.exports = router;
