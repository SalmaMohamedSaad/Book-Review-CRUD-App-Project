const express = require('express')
const Book = require('../models/book')
const Review = require('../models/review')
const newReview = async (req, res) => {
  const id = req.params.id
  const book = await Book.findById(id)
  res.render('reviews/newReview.ejs', { book })
}
module.exports = { newReview }
