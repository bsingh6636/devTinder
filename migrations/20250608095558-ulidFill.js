'use strict';
const { ulid  } = require('ulid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const [users ] = await queryInterface.sequelize.query('SELECT id FROM user');

    for (const user of users) {
      await queryInterface.sequelize.query(`UPDATE user SET ulid = '${ulid()}' WHERE id = ${user.id}`)
    }

    await queryInterface.changeColumn('user', 'ulid', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query('UPDATE user SET ulid = NULL');

  }
};
