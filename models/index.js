'use strict';
/* You should not modify this file - just copy it to your models directory
* and make sure to load it wherever you need to access the model classes:
* const db = require('../models');
* */

/**
 * Module dependencies.
 */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');

/**
 * Get the basename of the file.
 */
const basename = path.basename(__filename);

/**
 * Determine the environment.
 */
const env = process.env.NODE_ENV || 'development';

/**
 * Load configuration from config file.
 */
const config = require(__dirname + '/../config/config.json')[env];

/**
 * Create an empty object to store models.
 */
const db = {};

/**
 * Initialize Sequelize connection.
 */
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

/**
 * Read all files in the directory and load models.
 */
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize);
    db[model.name] = model;
  });

/**
 * Associate models if necessary.
 */
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

/**
 * Export Sequelize instance and Sequelize constructor.
 */
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
