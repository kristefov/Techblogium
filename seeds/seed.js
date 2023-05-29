/* This code is seeding a database with data from JSON files. It requires the Sequelize connection from
the `../config/connection` file and the User, Blog, and Comment models from the `../models`
directory. It also imports data from three JSON files: `userData.json`, `blogData.json`, and
`commentData.json`. */
const sequelize = require("../config/connection");
const { User, Blog, Comment } = require("../models");

const userData = require("./userData.json");
const blogData = require("./blogData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  for (var blog of blogData) {
    await Blog.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id
    });
  }
    for (const comment of commentData) {
      await Comment.create({
      ...comment,
        user_id: users[Math.floor(Math.random() * users.length)].id,
        blog_id: users[Math.floor(Math.random() * users.length)].id,
      });
      console.log(blogData);
    }
    
  process.exit(0);
};
seedDatabase();
