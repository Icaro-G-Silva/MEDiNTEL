module.exports = {
    validateDocument(CPF) {
        var cpf = CPF.replace(/[^0-9]/g, '')

        var digitA = 0, digitB = 0

        for(let i = 0, x = 10; i <= 8; i++, x--) digitA += cpf[i] * x

        for(let i = 0, x = 11; i <= 9; i++, x--) {
            if(i.toString().repeat(11) == cpf) return false
            digitB += cpf[i] * x
        }

        const sumA = ((digitA % 11) < 2) ? 0 : 11 - (digitA % 11)
        const sumB = ((digitB % 11) < 2) ? 0 : 11 - (digitB % 11)

        return sumA != cpf[9] || sumB != cpf[10] ? false : true
    }
}
