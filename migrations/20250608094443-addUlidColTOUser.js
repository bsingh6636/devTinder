'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.addColumn('user', 'ulid', {
      type: Sequelize.STRING,
      unique: true,
      after: 'id'
    })

    await queryInterface.addIndex('user', ['ulid'] ,{
      name : 'user_ulid_idx',
      unique: true
    } )
  },
  

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('user', 'user_ulid_idx')
    await queryInterface.removeColumn('user', 'ulid')
  }
};
