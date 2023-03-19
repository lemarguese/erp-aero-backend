const jwt = require('jsonwebtoken')
const generator = require('generate-password')

const generate = () => {
    return generator.generate({
        length: 20,
        numbers: true
    })
}

const generateToken = () => {
    return {
        accessToken: jwt.sign({message: 'successAccess'}, generate()),
        refreshToken: jwt.sign({message: 'successRefresh'}, generate())
    }
}

module.exports = {
    refresh: refreshToken,
    generate: generateToken
};


