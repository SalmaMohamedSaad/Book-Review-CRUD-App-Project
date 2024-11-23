const express = require('express')
const route = express.Router()
const authController = require('../controllers/auth')

route.get('/auth/signup', authController.signup)
route.post('/auth/signup', authController.signupSubmit)
route.get('/auth/newsignin', authController.newsignin)
route.post('/auth/signin', authController.signin)
route.get('/auth/signout', authController.signout)

module.exports = route
