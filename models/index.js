'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const logger = require('../src/utils/logger');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, './../.env') });

const basename = path.basename(__filename);
const db = {};

// Database connection config
const dbConfig = {
  database: process.env.AZURE_DBNAME,
  username: 'brijesh@azure-brijesh',
  password: process.env.AZURE_DB_PASSWORD,
  host: process.env.AZURE_DB_HOST,
  dialect: 'mssql',
  port: 1433,
  logging: false,
  dialectOptions: {
    options: {
      encrypt: true,
      trustServerCertificate: false,
      enableArithAbort: true,
      connectTimeout: 60000,
      requestTimeout: 60000,
    },
  },
};

// Create Sequelize connection
async function sequelizeConnection() {
  try {
    const sequelize = new Sequelize(dbConfig);
    await sequelize.authenticate();
    logger.info('✅ Database connection established.');
    return sequelize;
  } catch (error) {
    logger.error('❌ Database connection failed:', error.message);
    return null;
  }
}

// Initialize DB: connect, load models, set associations
async function initializeDatabase() {
  const sequelize = await sequelizeConnection();
  if (!sequelize) throw new Error('Database connection failed.');

  // Load models
  fs.readdirSync(__dirname)
    .filter(file =>
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      !file.endsWith('.test.js')
    )
    .forEach(file => {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });

  // Setup associations
  Object.values(db).forEach(model => {
    if (typeof model.associate === 'function') {
      model.associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return { DB: db, sequelizeConnection };
}

// Export DB
initializeDatabase()
  .then(result => {
    module.exports = result;
    logger.info('✅ Database initialized.');
  })
  .catch(error => {
    logger.error('❌ Initialization error:', error.message);
    module.exports = { DB: {}, sequelizeConnection: () => null };
  });
