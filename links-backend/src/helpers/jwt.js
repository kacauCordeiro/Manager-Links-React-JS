require('dotenv').config();
const jwt = require('jsonwebtoken');

console.log('*** Helpers.jwt ---',jwt)

const tokenPrivateKey = process.env.JWT_TOKEN_PRIVATE_KEY;
const tokenPrivateKeyRefresh = process.env.JWT_TOKEN_PRIVATE_KEY_REFRESH;
const options = { expiresIn: '30 minutes'};
const refreshOptions = { expiresIn: '30 days'};

const generateJwt = (payload) =>{
    console.log('*** Helpers.jwt.generateJwt: ', payload, tokenPrivateKey, options)
    return jwt.sign(payload, tokenPrivateKey, options);
};

const generateRefreshJwt = (payload) =>{
    console.log('*** Helpers.jwt.generateRefreshJwt: ', payload, tokenPrivateKeyRefresh, refreshOptions)
    return jwt.sign(payload, tokenPrivateKeyRefresh, refreshOptions);
};

const verifyJwt = (token) =>{
    console.log('*** Helpers.jwt.verifyJwt: ', token, tokenPrivateKey)
    return jwt.verify(token, tokenPrivateKey)
}

const verifyRefreshJwt = (token) =>{
    return jwt.verify(token, tokenPrivateKeyRefresh)
}

const getTokenFromHeaders = (req,headers) =>{
    console.log(req.Authorization)
    console.log(req.headers['Authorization'])
    const token = req.headers['Authorization'];
    console.log(token)
    return token ? token.slice(7, token.length): null;

}

module.exports = { generateJwt, generateRefreshJwt, verifyJwt, verifyRefreshJwt, getTokenFromHeaders}