module.exports = {
    takePasswdOut(object) {
        const {password, ...restObject} = object
        return restObject
    }
}