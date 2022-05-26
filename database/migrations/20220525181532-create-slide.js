'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Slides', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      imageURL: {
        allowNull: false,
        type: Sequelize.STRING
      },
      text: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      order: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      organizationId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Organizations',
          key:'id',
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Slides');
  }
};