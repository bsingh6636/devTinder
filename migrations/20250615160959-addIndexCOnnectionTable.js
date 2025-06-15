'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addIndex('connectionRequests', ['senderId', 'receiverId', 'status'],
       {
        name : 'connectionRequests_senderId_receiverId_status_idx',
        unique: true
       }
     )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('connectionRequests', 'connectionRequests_senderId_receiverId_status_idx')
  }
};
