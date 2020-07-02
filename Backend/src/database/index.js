const Sequelize = require('sequelize')
const dbConfig = require('../configs/database')
const Patient = require('../models/Patient')
const Doctor = require('../models/Doctor')
const BloodCount = require('../models/BloodCount')
const Eritograma = require('../models/Eritograma')
const Leucograma = require('../models/Leucograma')
const Plaquetario = require('../models/Plaquetario')

const connection = new Sequelize(dbConfig)

Patient.init(connection)
Doctor.init(connection)
BloodCount.init(connection)
Eritograma.init(connection)
Leucograma.init(connection)
Plaquetario.init(connection)


Patient.associate(connection.models)
Doctor.associate(connection.models)
BloodCount.associate(connection.models)
Eritograma.associate(connection.models)
Leucograma.associate(connection.models)
Plaquetario.associate(connection.models)

module.exports = connection
