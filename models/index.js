//import models
const User = require("./User");
const BlogPost = require("./BlogPost");
const BlogComments = require("./BlogComments");

// Users have many Blog Posts
User.hasMany(BlogPost, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(BlogComments, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

BlogPost.hasMany(BlogComments, {
  foreignKey: "blog_post_id",
  onDelete: "CASCADE",
});

BlogPost.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

BlogComments.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

BlogComments.belongsTo(BlogPost, {
  foreignKey: "blog_post_id",
  onDelete: "CASCADE",
});

module.exports = {
  User,
  BlogPost,
  BlogComments,
};
