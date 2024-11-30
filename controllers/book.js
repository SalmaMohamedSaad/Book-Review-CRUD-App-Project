const express = require('express')
const Book = require('../models/book')
const Review = require('../models/review')
const fs = require('fs')
// Require the upload middleware
const upload = require('../middleware/file-upload')
const { log } = require('console')

const index = async (req, res) => {
  try {
    const books = await Book.find({ status: 'Public' })
    res.render('index.ejs', { books })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}
const search = async (req, res) => {
  try {
    const books = await Book.find({
      status: 'Public',
      $or: [
        // to search in both title or author fileds
        { title: new RegExp(req.body.search, 'i') }, // i is to make the search criteria case insensitive
        { author: new RegExp(req.body.search, 'i') } //
      ]
    })
    // console.log('Search Criteria===============>>>', req.body.search)
    // console.log('Search Result===============>>>', books)
    res.render('index.ejs', { books })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}
const myBooks = async (req, res) => {
  try {
    const books = await Book.find({ ownerid: req.session.user._id })
    res.render('books/index.ejs', { books })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}
const newBook = async (req, res) => {
  try {
    res.render('books/newBook.ejs')
  } catch (error) {
    console.log(error)
    req.session.errmessage = 'Please try again later ........'
    res.redirect('/')
  }
}
const create = async (req, res) => {
  try {
    req.body.coverImage = req.file.filename
    //console.log('===================>>>', req.session.user._id)
    req.body.ownerid = req.session.user._id
    await Book.create(req.body)

    res.redirect('/book/myBooks')
  } catch (error) {
    console.log(error)
    req.session.errmessage = 'Please try again later ........'
    res.redirect('/')
  }
}
const show = async (req, res) => {
  const id = req.params.id
  let currentUser = ''
  if (req.session.user && req.session.user._id) {
    currentUser = req.session.user._id
  }

  const book = await Book.findById(id)
  const reviews = await Review.find({ bookid: id }).populate('ownerid')
  // console.log('currentUser', currentUser)
  // console.log('ownerid', book.ownerid)
  // console.log('reviews', reviews)
  res.render('books/show.ejs', { book, currentUser, reviews })
}
const edit = async (req, res) => {
  const id = req.params.id
  const book = await Book.findById(id)
  res.render('books/edit.ejs', { book })
}
const update = async (req, res) => {
  const id = req.params.id
  req.body.coverImage = req.file.filename
  const bookRecord = await Book.findById(id)
  fs.unlinkSync(`./public/uploads/${bookRecord.coverImage}`)
  await Book.findByIdAndUpdate(id, req.body)
  res.redirect('/book/myBooks')
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
  search,
  myBooks,
  newBook,
  create,
  show,
  edit,
  update,
  deleteBook
}
