const mongoose = require('mongoose')
const reviewSchema = new mongoose.Schema({
  title: String,
  description: String,
  ownerid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bookid: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },

  favoritedByUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
})

const Review = mongoose.model('Review', reviewSchema) // create model

module.exports = Review
