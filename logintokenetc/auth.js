'use strict'

const mongoose = require('mongoose')
const User = require('../logintokenetc/user')
const services = require('../services')

function isAuth (req, res, next) {
    if (!req.headers.authoritation){
        return res.status(404).send({message: 'No tienes autorización'})
    }
    
const token= req.headers.authoritation.split(' ')[i]

    services.decodeToken(token)
    .then(response => {
        req.user = responsenext()
    })
    .catch(response => {
        res.status(response.status)
    })
}

module.exports = isAuth

