/* These lines of code are importing necessary modules and dependencies for the application. */
const express = require("express");
const path = require("path");
const sequelize = require("./config/connection");
const exphbs = require("express-handlebars");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const helpers = require('./utils/helpers')

const routes = require("./controllers");
// const helpers = require("./util/helpers");
const app = express();
const PORT = process.env.PORT || 3001;

/* `const hbs = exphbs.create({ helpers });` creates a new instance of the Handlebars engine with the
`helpers` object passed as an argument. This allows the application to use custom helper functions
in the Handlebars templates. */
const hbs = exphbs.create({ helpers });
const sess = {
  secret: "Super secret secret",
  cookie: {maxAge: 300000},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
/* These lines of code are setting up and configuring the Express application. */
app.use(session(sess));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
