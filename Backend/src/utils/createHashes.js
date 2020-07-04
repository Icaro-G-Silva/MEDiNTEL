const {hasDoctor, hasPatient, hasBloodCount, hasEritograma, hasLeucograma, hasPlaquetario} = require('./hasRegister')
const crypto = require('crypto')

//Begin Passwd
var SaltLength = 7

async function createHash(password) {
  var salt = await generateSalt(SaltLength)
  var hash = await sha512(password + salt)
  return salt + hash
}

async function validateHash(hash, password) {
  var salt = hash.substr(0, SaltLength)
  var validHash = salt + await sha512(password + salt)
  return hash === validHash
}

async function generateSalt(len) {
  var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ',
      setLen = set.length,
      salt = ''
  for (var i = 0; i < len; i++) {
    var p = Math.floor(Math.random() * setLen)
    salt += set[p]
  }
  return salt
}

async function sha512(string) {
  return crypto.createHash('sha512').update(string).digest('hex')
}
//End Passwd

//Begin ID

async function createDoctorId() {
    var exist = true
    do {
        var id = crypto.randomBytes(12).toString('hex').slice(0, 12)
        if(!await hasDoctor(id)) exist = false
    } while(exist)
    return id
}

async function createPatientId() {
    var exist = true
    do {
        var id = crypto.randomBytes(12).toString('hex').slice(0, 12)
        if(!await hasPatient(id)) exist = false
    } while(exist)
    return id
}

async function createBloodCountId() {
  var exist = true
  do {
      var id = crypto.randomBytes(12).toString('hex').slice(0, 12)
      if(!await hasBloodCount(id)) exist = false
  } while(exist)
  return id
}

async function createEritogramaId() {
  var exist = true
  do {
      var id = crypto.randomBytes(12).toString('hex').slice(0, 12)
      if(!await hasEritograma(id)) exist = false
  } while(exist)
  return id
}

async function createLeucogramaId() {
  var exist = true
  do {
      var id = crypto.randomBytes(12).toString('hex').slice(0, 12)
      if(!await hasLeucograma(id)) exist = false
  } while(exist)
  return id
}

async function createPlaquetarioId() {
  var exist = true
  do {
      var id = crypto.randomBytes(12).toString('hex').slice(0, 12)
      if(!await hasPlaquetario(id)) exist = false
  } while(exist)
  return id
}

//End ID

module.exports = {
    createHash,
    validateHash,
    createDoctorId,
    createPatientId,
    createBloodCountId,
    createEritogramaId,
    createLeucogramaId,
    createPlaquetarioId
}