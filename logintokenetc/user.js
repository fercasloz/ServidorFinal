'use script'

const User = require('../models/user')
const service = require('../services')

function signUp (req, res) {
    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName,
        password: req.doby.password
    })

    user.save((err) => {
        if (err) return res.status(500).send({message: 'Error al crear el usuario: ${err}'})
        return res.status(200).send({token: service.createToken(user)})
    })
}

function signIn (req, res) {
    User.find({ email: req.body.email}, (err, user) => {
        if (err) return res.status(500).send({message: err})
        if (!user) return res.status(404).send({message: 'No existe el usuario'})

        req.user = userres.status(200).send({
            message: 'Te hs logueado correctamente',
            token: service.createToken(user)
        })
    })
}

module.exports = {
    signUp,
    signIn
}