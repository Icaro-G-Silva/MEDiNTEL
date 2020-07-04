'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Leucogramas', {
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
        leucocitos: {
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
        celulasBlasticas: {
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
        promielocito: {
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
        mielocito: {
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
        metamielocito: {
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
        bastonete: {
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
        segmentado: {
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
        eosinofilo: {
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
        basofilo: {
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
        linfocitos: {
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
        linfocitosAtipicos: {
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
        monocito: {
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
        plasmocito: {
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
      return queryInterface.dropTable('Leucogramas');
  }
};
