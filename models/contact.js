'use strict';

const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // relations can be defined here, for example:
      Contact.hasMany(models.Order, {
        foreignKey: 'contact_id'
      })
    }
  }
  Contact.init({
    firstName: DataTypes.STRING,
    lastName: {
      type: DataTypes.STRING,
      allowNull: false, // constraint level validation (SQL level validation)
      validate: { // sequelize level validation
            isAlpha: true,
      }
    },
    phone: {
      type: DataTypes.STRING,
      validate: { // sequelize level validation
        isNumeric: true,
      }},
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: { // sequelize level validation
        isEmail: true
      }},
    timePlaced: { type: DataTypes.TIME, defaultValue: DataTypes.NOW }
  }, {
    sequelize, // We need to pass the connection instance
    modelName: 'Contact',
  });
  return Contact;
};
