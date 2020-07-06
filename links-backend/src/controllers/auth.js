const express = require('express');
const { Account } = require('../models');
const { accountSignUp, accountSignIn } = require('../validators/account')
const bcrypt = require('bcrypt');
const {getMessage} = require('../helpers/validator')
const { generateJwt, generateRefreshJwt, verifyRefreshJwt, getTokenFromHeaders} = require('../helpers/jwt')

const router = express.Router();
const saltRounds = 10;

router.post('/sign-in', accountSignIn, async (req, res) =>{
    const {email, password} = req.body;
    const account = await Account.findOne({where: { email } });

    // validar
    const match = account ? bcrypt.compareSync(password, account.password) : null;
    if(!match) return res.jsonBadRequest(null, getMessage('account.signup.email_exists') );

    const token = generateJwt({id: account.id})
    const refreshtoken = generateRefreshJwt({id: account.id, version: account.jwtVersion })

    return res.jsonOK(account, getMessage('account.signin.sucess'), token, refreshtoken)
})

router.post('/sign-up', accountSignUp, async (req, res) =>{
    const {email, password} = req.body;

    const account = await Account.findOne({ where: { email } });

    if (account) return res.jsonBadRequest(null,getMessage('account.signup.email_exists'));

    const hash = bcrypt.hashSync(password, saltRounds);
    const newAccount =  await Account.create({email,password: hash});

    const token = generateJwt({id: newAccount.id})
    const refreshtoken = generateRefreshJwt({id: newAccount.id, version: newAccount.jwtVersion})

    return res.jsonOK(newAccount, getMessage('account.signup.sucess'), token, refreshtoken)
})

router.post('/refresh', async (req, res)=> {
    const token = getTokenFromHeaders(req.headers);
    if(!token){
        return res.jsonUnauthorized(null, 'Invalid token');
    }

    try{
        const decoded = verifyRefreshJwt(token);
        const account = await Account.findByPk(decoded.id);
        if(!account) return res.jsonUnauthorized(null, 'Invalid token');

        if(decoded.version != account.jwtVersion){
            return res.jsonUnauthorized(null, 'Invalid token');
        } 
        const meta = {
            token: generateJwt({ id: account.id},)
        };

        return res.jsonOK(null, null, meta)

    }catch (error){
        return res.jsonUnauthorized(null, 'Invalid token');
    }

})
module.exports = router;