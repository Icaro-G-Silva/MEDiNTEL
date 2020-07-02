module.exports = {
    doctorTable: `CREATE TABLE IF NOT EXISTS Doctors(
        id INTEGER NOT NULL AUTO_INCREMENT,
        crm INTEGER NOT NULL,
        name VARCHAR(80) NOT NULL,
        surname VARCHAR(50) NOT NULL,
        idDocument VARCHAR(15) NOT NULL,
        birth VARCHAR(11) NOT NULL,
        sex VARCHAR(10),
        login VARCHAR(80) NOT NULL,
        password VARCHAR(255) NOT NULL,
        accessLevel VARCHAR(20) NOT NULL,
        createdAt DATE NOT NULL,
        updatedAt DATE NOT NULL,
        PRIMARY KEY(crm),
        UNIQUE KEY(id)
    );`,
    
    patientTable: `CREATE TABLE IF NOT EXISTS Pacients(
        id INTEGER NOT NULL AUTO_INCREMENT,
        rp INTEGER NOT NULL,
        doctorId INTEGER,
        name VARCHAR(80) NOT NULL,
        surname VARCHAR(50) NOT NULL,
        idDocument VARCHAR(15) NOT NULL,
        birth VARCHAR(11) NOT NULL,
        sex VARCHAR(10),
        login VARCHAR(80) NOT NULL,
        password VARCHAR(255) NOT NULL,
        accessLevel VARCHAR(20) NOT NULL,
        createdAt DATE NOT NULL,
        updatedAt DATE NOT NULL,
        PRIMARY KEY(rp),
        FOREIGN KEY(doctorId) REFERENCES Doctors(crm),
        UNIQUE KEY(id)
    );`
};