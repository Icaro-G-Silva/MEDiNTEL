'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Patients', {
        id: {
          type: Sequelize.STRING(15),
          primaryKey: true,
          allowNull: false,
          unique: true
        },
        rp: { //Registro do Paciente
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
        doctorId: { //Coluna do Relacionamento com o `Doctors`
          type: Sequelize.STRING(15),
          allowNull: true,
          references: {model: 'Doctors', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },
        name: {
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
        surname: {
          type: Sequelize.STRING(50),
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
        idDocument: { //Documento CPF
          type: Sequelize.STRING(15),
          allowNull: false,
          unique: true,
          validate: {
            isEmpty: {
              msg: "This field cannot be empty"
            },
            len: {
              args: [12, 15],
              msg: "This field needs at least 12 and at max 15 characters"
            }
          }
        },
        birth: { //Data completa Aniversário 00/00/0000
          type: Sequelize.STRING(11),
          allowNull: false,
          validate: {
            isEmpty: {
              msg: "This field cannot be empty"
            },
            len: {
              args: [8, 11],
              msg: "This field needs at least 8 and at max 11 characters"
            }
          }
        },
        sex: {
          type: Sequelize.STRING(10),
          allowNull: true,
          validate: {
            max: {
              msg: "This field cannot transpass its maximum amount, that is 10 characters"
            }
          }
        },
        login: {
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
        password: {
          type: Sequelize.STRING,
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
        accessLevel: { //Nível de Acesso: "Doctor", "Patient"
          type: Sequelize.STRING(20),
          allowNull: false,
          validate: {
            isEmpty: {
              msg: "This field cannot be empty"
            },
            len: {
              args: [5, 20],
              msg: "This field needs at least 5 and at max 20 characters"
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
      return queryInterface.dropTable('Patients');
  }
};
