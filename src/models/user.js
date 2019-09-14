'use strict';

const SequelizeSlugify = require('sequelize-slugify');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Email must be unique'
      },
      validate: {
        isEmail: {
          msg: "Email address must be valid"
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Username must be unique'
      },
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  SequelizeSlugify.slugifyModel(User, {
    source: ['username'],
    column: ['username']
  });

  User.associate = function(models) {
    // associations can be defined here
  };

  return User;
};