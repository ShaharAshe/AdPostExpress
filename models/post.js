'use strict';

const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Post extends Model {}
  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull: true, // constraint level validation (SQL level validation)
      validate: { // sequelize level validation
        max: 20,
        isAlpha: true,
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false, // constraint level validation (SQL level validation)
      validate: { // sequelize level validation
        max: 200,
        isAlpha: true,
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false, // constraint level validation (SQL level validation)
      validate: { // sequelize level validation
        min: 0,
        isNumeric: true,
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true, // constraint level validation (SQL level validation)
      validate: { // sequelize level validation
        is: /^[0-9]{2,3}-[0-9]{7}$/,
      }},
    email: {
      type: DataTypes.STRING,
      allowNull: false, // constraint level validation (SQL level validation)
      validate: { // sequelize level validation
        isEmail: true,
      }},
    approve:{
      type: DataTypes.STRING,
      defaultValue: 'no',
    },
    timePlaced: {
      type: DataTypes.TIME,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize, // We need to pass the connection instance
    modelName: 'Post',
    hooks: {
      beforeCreate: (user) => {
        if (user && user.where && user.where.approve === 'yes') {
          if(!user.context.login)
          {
            // User not logged in, prevent access to approved posts
            user.where.approve = 'no';
          }
        }
        // else{}
      }
    }

  });
  return Post;
};
