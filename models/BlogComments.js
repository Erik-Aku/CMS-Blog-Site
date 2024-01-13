const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class BlogComments extends Model {}

BlogComments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    blog_post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "blogpost",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    comment_text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "blogcomments",
  }
);

module.exports = BlogComments;
