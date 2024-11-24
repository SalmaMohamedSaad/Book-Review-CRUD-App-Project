const express = require('express')
const route = express.Router()
const reviewController = require('../controllers/review')
const isSignIn = require('../middleware/is-signed-in')
const passUserToView = require('../middleware/pass-user-to-view')

route.get('/review/:id/newReview', isSignIn, reviewController.newReview)

module.exports = route
