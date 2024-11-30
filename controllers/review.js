const express = require('express')
const Book = require('../models/book')
const Review = require('../models/review')
const newReview = async (req, res) => {
  const id = req.params.id
  const book = await Book.findById(id)
  res.render('reviews/newReview.ejs', { book })
}
const create = async (req, res) => {
  try {
    req.body.ownerid = req.session.user._id
    req.body.bookid = req.params.id
    await Review.create(req.body)
    req.session.message = 'Successfully added new review'
    res.redirect('/')
  } catch (error) {
    console.log(error)
    req.session.errmessage = 'Please try again later ........'
    res.redirect('/')
  }
}
const edit = async (req, res) => {
  //const id = req.params.id
  const bookId = req.params.bookId
  let currentUser = ''
  if (req.session.user && req.session.user._id) {
    currentUser = req.session.user._id
  }

  const book = await Book.findById(bookId)
  const reviews = await Review.find({ bookid: bookId }).populate('ownerid')

  // console.log('currentUser', currentUser)
  // console.log('ownerid', book.ownerid)
  // console.log('reviews', reviews)
  res.render('reviews/edit.ejs', { reviews, book, currentUser })
}
const update = async (req, res) => {
  const id = req.params.id
  const updatedRecord = await Review.findByIdAndUpdate(id, req.body)
  console.log('updatedRecord===============<', updatedRecord)
  res.redirect('back')
}
const deleteReview = async (req, res) => {
  const id = req.params.id
  const reviewRecord = await Review.findByIdAndDelete(id)
  res.redirect('back')
}
const likeReview = async (req, res) => {
  try {
    console.log('===========', req.params.id)
    await Review.findByIdAndUpdate(req.params.id, {
      $push: { favoritedByUsers: req.session.user._id }
    })
    res.redirect('back')
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}
module.exports = { newReview, create, deleteReview, edit, update, likeReview }
