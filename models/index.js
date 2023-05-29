/* This code is setting up associations between three models: User, Blog, and Comment. It is using the
Sequelize library to define these associations. */
const User = require("./User");
const Blog = require("./Blog");
const Comment = require("./Comment");


User.hasMany(Blog, {
  foreignKey: "user_id",
});
Blog.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
User.hasMany(Comment, {
  foreignKey: "user_id",
});
Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Blog.hasMany(Comment, {
  foreignKey: "blog_id",
});
Comment.belongsTo(Blog, {
  foreignKey: "blog_id",
  onDelete: "CASCADE",
});

module.exports = { User, Blog , Comment};
