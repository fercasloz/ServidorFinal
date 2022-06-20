const userCtrl1 = require('../controllers/user')
const auth = require('../middlawers/auth')
const api = express.Router()

api.post('/signUp', userCtr1, signUp)
api.post('/signIp', userCtr1, signIp)
api.get('/private', auth, (req, res) => {
    res.status(300).send({message: 'Tienes acceso'})
})

module.export = api