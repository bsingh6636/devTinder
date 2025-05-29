import { Sequelize } from 'sequelize';
import { config } from '../config/config.js';

console.log('Database Configuration:', config);

// Access the development configuration specifically
const devConfig = config.development;
const dataBase = devConfig.database;
const username = devConfig.username;
const password = devConfig.password;
const host = devConfig.host;
const dialect = devConfig.dialect || 'mysql';

const sequelize = new Sequelize(dataBase, username, password, {
  host: host,
  dialect: dialect
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}