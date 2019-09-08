'use strict';
module.exports = (sequelize, DataTypes) => {
  const Domain = sequelize.define('Domain', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: {
          msg: "URL must be valid"
        }
      }
    }
  }, {});
  Domain.associate = function(models) {
    // associations can be defined here
  };
  return Domain;
};