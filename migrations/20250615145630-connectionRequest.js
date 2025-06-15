'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.sequelize.query(`
      CREATE TABLE connectionRequests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        senderId INT NOT NULL,
        receiverId INT NOT NULL,
        status ENUM('ignore', 'interested', 'accepted', 'rejected') NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

        FOREIGN KEY (senderId) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (receiverId) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE
      )`)

      await queryInterface.addIndex('connectionRequests',['senderId'],{
        name : 'connectionRequests_senderId_idx',
      })

      await queryInterface.addIndex('connectionRequests',['receiverId'],{
        name : 'connectionRequests_receiverId_idx',
      })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query('DROP TABLE connectionRequests')
  }
};
