const express = require('express');
const router = express.Router();
const {Link} = require('../models')

router.get('/', async (req, res) => {
    const {accountId} = req;
    const links = await Link.findAll({where: { accountId }})

    return res.jsonOK(links);
});

router.get('/:id', async (req, res) =>{
    const {accountId} = req 
    const {id} = req.params;

    const link = await Account.findOne({ where: { id, accountId} });
    if(!link) return res.jsonNotFound();
    
    return res.jsonOK(link)
})

router.post('/', async (req, res) =>{
    const {accountId} = req 
    const {label, url, isSocial} = req.body;
    const image = '...'

    const link = await Link.creat({label, url, isSocial, image, accountId});

    return res.jsonOK(link)
})

router.put('/:id', async (req, res) =>{
    const {accountId} = req 
    const {label, url, isSocial} = req.body;
    const {id} = req.params

    const image = '...'
    const fields = ['label', 'url', 'isSocial'];

    const link = await Account.findOne({ where: { id, accountId} });
    if(!link) return res.jsonNotFound();
    fields.map(fieldname => {
        const newValue = req.body[fieldName];
        if (newValue) link[fieldname] = newValue;
    });

    await link.save();

    return res.jsonOK(link)
})

router.delete('/:id', async (req, res) =>{
    const {accountId} = req
    const {id} = req.params

    const link = await Account.findOne({ where: { id, accountId} });
    if(!link) return res.jsonNotFound();

    await link.destroy();

    return res.jsonOK(link)
})


module.exports = router;