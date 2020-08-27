module.exports = {
    async verifyCRM(crm) {
        const regexDigits = /\d/g
        const regexString = /([A-z])/g
        try {
            crm = crm.split('/')
            const [numbers, province] = crm
            if(numbers.length != 7 || province.length != 2) return false
            if(regexString.test(numbers) || regexDigits.test(province)) return false
            //Come more validations with externalAPI
            else return true
        } catch (error) {
            console.error(error)
        }
    }
}
