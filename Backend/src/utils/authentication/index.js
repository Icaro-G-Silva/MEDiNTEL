const jwt = require('jsonwebtoken')

const secret = '7589f45b8e17974c53307dfa8471bf069ea883ca3452c3fe4586726c22819bf3'
module.exports = {
    sign(payload) {
        return jwt.sign(payload, secret, { expiresIn: 86400 })
    },
    verify(token) {
        return jwt.verify(token, secret)
    }
}
