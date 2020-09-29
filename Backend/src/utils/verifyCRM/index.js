const axios = require('../axios')

module.exports = {
    async verifyCRM(crm) {
        const regexDigits = /\d/g
        const regexString = /([A-z])/g
        try {
            crm = crm.split('/')
            const [numbers, province] = crm
            if(numbers.length < 4 || numbers.length > 10 || province.length != 2) return false
            if(regexString.test(numbers) || regexDigits.test(province)) return false
            var doctor
            await axios.get(`https://www.consultacrm.com.br/api/index.php?tipo=crm&uf=${province.toUpperCase()}&q=${numbers}&chave=5723461945&destino=json`).then(response =>{
                doctor = response.data
            })
            if(doctor.item[0].situacao != 'Ativo') return false
            return true
        } catch (error) {
            console.error(error)
        }
    }
}
