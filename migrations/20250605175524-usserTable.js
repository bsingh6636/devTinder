'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE TABLE user(
        id INT AUTO_INCREMENT PRIMARY KEY,
        emailId VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(500) NOT NULL,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        age INT NOT NULL,
        gender ENUM('male', 'female') NOT NULL,
        country VARCHAR(255) NOT NULL,
        skills VARCHAR(255) NOT NULL,
        photoUrl VARCHAR(255) NOT NULL,

        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

        INDEX inx_emailId(emailId)
      ) `)
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.sequelize.query('DROP TABLE user')
  }
};
