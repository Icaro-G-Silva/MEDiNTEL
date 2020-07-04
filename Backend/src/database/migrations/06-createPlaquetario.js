'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Plaquetarios', {
        id: {
          type: Sequelize.STRING(15),
          primaryKey: true,
          allowNull: false,
          unique: true
        },
        bloodCountId: { //Associate with `BloodCount`
          type: Sequelize.STRING(15),
          allowNull: true,
          references: {model: 'BloodCounts', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        plaquetas: {
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
            isEmpty: {
              msg: "This field cannot be empty"
            },
            max: {
              msg: "This field cannot transpass its maximum amount, that is 255 characters"
            }
          }
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
        }
      });
  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('Plaquetarios');
  }
};
