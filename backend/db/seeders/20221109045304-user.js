'use strict';
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Users', [
      {
        firstName: 'First',
        lastName: 'Guy',
        email: 'firstguy@email.com',
        username: 'firstGuy',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Second',
        lastName: 'Dude',
        email: 'seconddude@email.com',
        username: 'secondGuy',
        hashedPassword: bcrypt.hashSync('password')
      }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
