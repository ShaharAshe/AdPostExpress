'use strict';

/**
 * Module dependencies.
 */
const { DataTypes, Model } = require('sequelize');

/**
 * Define the User model.
 * @param {object} sequelize - The Sequelize instance.
 */
module.exports = (sequelize) => {
  class User extends Model {}

  /**
   * Initialize the User model.
   */
  User.init({
    login: {
      type: DataTypes.STRING,
      allowNull: false, // constraint level validation (SQL level validation)
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // constraint level validation (SQL level validation)
    },
  },
  {
    sequelize // We need to pass the connection instance
  });

  return User;
};
