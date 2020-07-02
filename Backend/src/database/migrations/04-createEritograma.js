'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Eritograma', {
        id: {
          type: Sequelize.STRING(15),
          primaryKey: true,
          allowNull: false,
          unique: true
        },
        bloodCountId: { //Associate with `BloodCount`
          type: Sequelize.STRING(15),
          allowNull: true,
          references: {model: 'BloodCount', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        eritrocitos: {
          type: Sequelize.FLOAT,
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
        hemoglobina: {
          type: Sequelize.FLOAT,
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
        hematocrito: {
          type: Sequelize.FLOAT,
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
        VCM: {
          type: Sequelize.FLOAT,
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
        HCM: {
          type: Sequelize.FLOAT,
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
        CHCM: {
          type: Sequelize.FLOAT,
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
        RDW: {
          type: Sequelize.FLOAT,
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
      return queryInterface.dropTable('Eritograma');
  }
};
