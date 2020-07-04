module.exports = {
    verifyBloodDatasInputs(id, datas) {
        if(id === null || id ===  undefined) return false 
        for(let value in datas) {
            if(datas[value] === '' || datas[value] === undefined || datas[value] === null) return false
        }
        return true
    }
}
