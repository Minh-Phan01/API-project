'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

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

    options.tableName = 'Users'

   await queryInterface.bulkInsert(options, [
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
    options.tableName = 'Users'

    await queryInterface.bulkDelete(options, null, {});
  }
};
