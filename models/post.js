'use strict';

const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Post extends Model {}
  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false, // constraint level validation (SQL level validation)
      validate: { // sequelize level validation
        len: [1, 20],
        msg: `The Title Value as a problem (The Title must not be empty AND The max length of the Title is 20 chars)`
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true, // constraint level validation (SQL level validation)
      validate: { // sequelize level validation
        len: [0, 200],
        msg: `The Description Value as a problem (The max length of the Description is 200 chars)`
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false, // constraint level validation (SQL level validation)
      validate: { // sequelize level validation
        min: 0,

        isNumeric: true,
        msg: `The Price Value as a problem (The Price must not be empty AND The min value of the Price is 0)`
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true, // constraint level validation (SQL level validation)
      validate: { // sequelize level validation
        is: /^[0-9]{2,3}-[0-9]{7}$|^$/,
        msg: `The Phone Number Value as a problem (phone number in format XXX-XXXXXXX (for example 02-1231212 or 055-1231212))`
      }},
    email: {
      type: DataTypes.STRING,
      allowNull: false, // constraint level validation (SQL level validation)
      validate: { // sequelize level validation
        isEmail: true,
        msg: `The Email Value as a problem (The Price must not be empty AND email need to be 2 parts and a “@” character in between)`
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
      beforeFind: (option) => {
      }
    }

  });
  return Post;
};
