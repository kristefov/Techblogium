const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
      },
      blog_id: {
        type: DataTypes.INTEGER,
                references: {
                  model: "blog",
                  key: "id",
                },
      }
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: "comment",
  }
)
module.exports = Comment;