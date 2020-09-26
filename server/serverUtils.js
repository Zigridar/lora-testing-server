'use strict'
const crypto = require('crypto')
const sha256 = crypto.createHash('sha256')

/** auth token for user session **/
exports.generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex')
}

/** returns hash of the password **/
exports.getHashedPassword = password => {
    return sha256.update(password).digest('base64')
}