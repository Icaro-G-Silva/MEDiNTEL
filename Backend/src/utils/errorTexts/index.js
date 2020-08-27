class GeneralPurposes {
    constructor(substitution) {
        this.notFound = `${substitution} not found!`
        this.errorAtController = error => `Error ocurred at '${substitution}Controller' -> ${error}`
        this.isAlreadyRegistered = `${substitution} is already registered!`
        this.someShitHappened = 'Some shit happened'
    }
}

class PseudoElements extends GeneralPurposes {
    constructor(name) {
        super(name)
        this.dataObjectNotFit = "datas' Object is not fitting"
        this.anyXRegistered = `Does not has any ${name} registered!`
        this.bloodCountNotFit = 'Blood Count ID is not fitting'
    }
}

class BloodCountErrors extends GeneralPurposes {
    constructor() {
        super('Blood Count')
        this.patientNotExists = 'Patient does not exists'
    }
}

class DoctorPatientCommon extends GeneralPurposes {
    constructor(name) {
        super(name)
        this.invalidDocument = 'Invalid Document'
        this.invalidCRM = 'Invalid CRM'
        this.login = new GeneralPurposes('Login')
    }
}

class DoctorErrors extends DoctorPatientCommon {
    constructor() {
        super('Doctor')
    }
}

class PatientErrors extends DoctorPatientCommon {
    constructor() {
        super('Patient')
        this.crmNotFound = "Doctor's crm not found"
    }
}

class AuthErrors extends GeneralPurposes {
    constructor() {
        super('Auth')
        this.unauthorized = message => `Unauthorized. ${message}`
    }
}

module.exports = {
    PseudoElements,
    BloodCountErrors,
    DoctorErrors,
    PatientErrors,
    AuthErrors
}