'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('BloodCounts', {
        id: {
          type: Sequelize.STRING(15),
          primaryKey: true,
          allowNull: false,
          unique: true
        },
        requestNumber: {
          type: Sequelize.INTEGER,
          autoIncrement: false,
          allowNull: false,
          unique: true,
          validate: {
            isEmpty: {
              msg: "This field cannot be empty"
            },
            max: {
              msg: "This field cannot transpass its maximum amount, that is 80 characters"
            }
          }
        },
        medicalRecord: {
          type: Sequelize.STRING(80),
          allowNull: false,
          validate: {
            isEmpty: {
              msg: "This field cannot be empty"
            },
            max: {
              msg: "This field cannot transpass its maximum amount, that is 80 characters"
            }
          }
        },
        requester: {
          type: Sequelize.STRING(80),
          allowNull: false,
          validate: {
            isEmpty: {
              msg: "This field cannot be empty"
            },
            max: {
              msg: "This field cannot transpass its maximum amount, that is 80 characters"
            }
          }
        },
        origin: {
          type: Sequelize.STRING(80),
          allowNull: false,
          validate: {
            isEmpty: {
              msg: "This field cannot be empty"
            },
            max: {
              msg: "This field cannot transpass its maximum amount, that is 80 characters"
            }
          }
        },
        destiny: {
          type: Sequelize.STRING(80),
          allowNull: false,
          validate: {
            isEmpty: {
              msg: "This field cannot be empty"
            },
            max: {
              msg: "This field cannot transpass its maximum amount, that is 80 characters"
            }
          }
        },
        collectionDate: {
          type: Sequelize.STRING(11),
          allowNull: false,
          validate: {
            max: {
              msg: "This field cannot transpass its maximum amount, that is 11 characters"
            }
          }
        },
        collectionHour: {
          type: Sequelize.STRING(10),
          allowNull: false,
          validate: {
            isEmpty: {
              msg: "This field cannot be empty"
            },
            max: {
              msg: "This field cannot transpass its maximum amount, that is 10 characters"
            }
          }
        },
        material: {
          type: Sequelize.STRING,
          allowNull: true,
          validate: {
            isEmpty: {
              msg: "This field cannot be empty"
            },
            max: {
              msg: "This field cannot transpass its maximum amount, that is 255 characters"
            }
          }
        },
        method: {
          type: Sequelize.STRING,
          allowNull: true,
          validate: {
            isEmpty: {
              msg: "This field cannot be empty"
            },
            max: {
              msg: "This field cannot transpass its maximum amount, that is 255 characters"
            }
          }
        },
        automation: {
          type: Sequelize.STRING,
          allowNull: true,
          validate: {
            isEmpty: {
              msg: "This field cannot be empty"
            },
            max: {
              msg: "This field cannot transpass its maximum amount, that is 255 characters"
            }
          }
        },
        releasedAtDate: {
          type: Sequelize.STRING(11),
          allowNull: true,
          validate: {
            isEmpty: {
              msg: "This field cannot be empty"
            },
            max: {
              msg: "This field cannot transpass its maximum amount, that is 11 characters"
            }
          }
        },
        releasedAtHour: {
          type: Sequelize.STRING(10),
          allowNull: true,
          validate: {
            isEmpty: {
              msg: "This field cannot be empty"
            },
            max: {
              msg: "This field cannot transpass its maximum amount, that is 10 characters"
            }
          }
        },
        patientId: { //association with `Patients`
          type: Sequelize.STRING(15),
          allowNull: true,
          references: {model: 'Patients', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
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
      return queryInterface.dropTable('BloodCounts');
  }
};
