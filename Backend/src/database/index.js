const Sequelize = require('sequelize')
const dbConfig = require('../configs/database')
const Pacient = require('../models/Pacient')
const Doctor = require('../models/Doctor')

const connection = new Sequelize(dbConfig)

Pacient.init(connection)
Doctor.init(connection)

Pacient.associate(connection.models)
Doctor.associate(connection.models)

module.exports = connection
