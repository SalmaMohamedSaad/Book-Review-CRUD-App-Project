const express = require('express')
const route = express.Router()
const bookController = require('../controllers/book')
const Upload = require('../middleware/file-upload')
const isSignIn = require('../middleware/is-signed-in')
const passUserToView = require('../middleware/pass-user-to-view')

route.get('/', bookController.index)
route.get('/book/myBooks', isSignIn, bookController.myBooks)
route.get('/book/newBook', isSignIn, bookController.newBook)
route.post(
  '/books/create',
  isSignIn,
  Upload.single('coverImage'),
  bookController.create
)
route.get('/books/:id/show', isSignIn, bookController.show)
route.get('/books/:id/delete', isSignIn, bookController.deleteBook)
module.exports = route
