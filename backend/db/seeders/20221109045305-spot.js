'use strict';

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

    options.tableName = 'Spots'

   await queryInterface.bulkInsert(options, [
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
        previewImage: 'https://www.bhg.com/thmb/0Fg0imFSA6HVZMS2DFWPvjbYDoQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg'
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
        previewImage: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg'
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

    options.tableName = 'Spots'

    await queryInterface.bulkDelete(options, null, {});
  }
};
