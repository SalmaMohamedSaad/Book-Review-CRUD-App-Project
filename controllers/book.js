const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const fs = require('fs')
// Require the upload middleware
const upload = require('../middleware/file-upload')

const index = async (req, res) => {
  const books = await Book.find()
  res.render('index.ejs', { books })
}
const myBooks = async (req, res) => {
  const books = await Book.find({ ownerid: `${req.session.user._id}` })
  res.render('books/index.ejs', { books })
}
const newBook = async (req, res) => {
  res.render('books/newBook.ejs')
}
const create = async (req, res) => {
  req.body.coverImage = req.file.filename
  //console.log('===================>>>', req.session.user._id)
  req.body.ownerid = req.session.user._id
  await Book.create(req.body)

  res.redirect('/book/myBooks')
}
const show = async (req, res) => {
  const id = req.params.id
  const book = await Book.findById(id)
  res.render('books/show.ejs', { book })
}
const deleteBook = async (req, res) => {
  const id = req.params.id
  const bookRecord = await Book.findById(id)
  fs.unlinkSync(`./public/uploads/${bookRecord.coverImage}`)
  await Book.findByIdAndDelete(id)
  res.redirect('/book/myBooks')
}
module.exports = {
  index,
  myBooks,
  newBook,
  create,
  show,
  deleteBook
}
