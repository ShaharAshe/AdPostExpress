'use strict';

/**
 * Module dependencies.
 */
const { DataTypes, Model } = require('sequelize');

/**
 * Define the Post model.
 * @param {object} sequelize - The Sequelize instance.
 */
module.exports = (sequelize) => {
  class Post extends Model {}

  /**
   * Initialize the Post model.
   */
  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false, // constraint level validation (SQL level validation)
      validate: { // sequelize level validation
        len: [1, 20],
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true, // constraint level validation (SQL level validation)
      validate: { // sequelize level validation
        len: [0, 200],
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
        is: /^[0-9]{2,3}-[0-9]{7}$|^$/,
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, // constraint level validation (SQL level validation)
      validate: { // sequelize level validation
        isEmail: true,
      }
    },
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
        // Hook logic can be added here
      }
    }
  });

  return Post;
};
