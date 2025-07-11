'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};
const logger = require('../src/utils/logger');

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
  sequeliseConnection();
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
  console.log('connection made ' + new Date() )
}

 async function  sequeliseConnection () {
  try {
  await sequelize.authenticate();
  logger.info('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
  logger.error('Unable to connect to the database:', error);
}
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

  logger.info(db.user, typeof db.user, 'modelName')


db.sequelize = sequelize;
db.Sequelize = Sequelize;

const DB = db


module.exports ={
  DB,
  sequeliseConnection
}