const User = require('./User');
const Blog = require('./Blog')

User.hasMany(Blog, {
  foreignKey: 'user_id' 
});
Blog.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
module.exports = {User, Blog}