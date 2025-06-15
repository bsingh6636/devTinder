'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
       user.hasMany(models.connectionRequest, {
         foreignKey: 'senderId',
         as: 'senderReequest'
       });
       user.hasMany(models.connectionRequest, {
         foreignKey: 'receiverId',
         as: 'receiverRequest'
       });
    }
  }

  user.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      ulid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      emailId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        require: true
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
        },
        {
          name: 'user_ulid_idx',
          fields: ['ulid']
        }
      ]
    }
  );

  return user;
};
