'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      // define association here if needed in future
    }
  }

  user.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      emailId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(500),
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      gender: {
        type: DataTypes.ENUM('male', 'female'),
        allowNull: false
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false
      },
      skills: {
        type: DataTypes.STRING,
        allowNull: false
      },
      photoUrl: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'user',
      tableName: 'user', 
      timestamps: true,
      indexes: [
        {
          name: 'inx_emailId',
          fields: ['emailId']
        }
      ]
    }
  );

  return user;
};
