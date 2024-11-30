const express = require('express')
const route = express.Router()
const reviewController = require('../controllers/review')
const isSignIn = require('../middleware/is-signed-in')
const passUserToView = require('../middleware/pass-user-to-view')

route.get('/review/:id/newReview', isSignIn, reviewController.newReview)
route.post('/review/:id/create', isSignIn, reviewController.create)
route.get('/review/:id/deleteReview', isSignIn, reviewController.deleteReview)
route.get('/review/:bookId/edit', isSignIn, reviewController.edit)
route.get('/review/:id/likeReview', isSignIn, reviewController.likeReview)
route.post('/review/:id/update', isSignIn, reviewController.update)

module.exports = route
