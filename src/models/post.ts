'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    short_description: DataTypes.STRING,
    content: DataTypes.TEXT,
    visits: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    path_image: DataTypes.STRING,
    domainId: DataTypes.INTEGER
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
  };
  return Post;
};