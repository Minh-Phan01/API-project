'use strict';

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
   await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '123 First Address Ave',
        city: 'First City',
        state: 'First State',
        country: 'First Country',
        lat: 135.791,
        lng: 246.80,
        name: 'first house',
        description: 'This is first spot',
        price: 123,
        previewImage: 'first-image'
      },
      {
        ownerId: 2,
        address: '456 Second Address Ave',
        city: 'Second City',
        state: 'Second State',
        country: 'Second Country',
        lat: 123.456,
        lng: 234.567,
        name: 'second house',
        description: 'This is second spot',
        price: 456,
        previewImage: 'second-image'
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
    await queryInterface.bulkDelete('Spots', null, {});
  }
};
