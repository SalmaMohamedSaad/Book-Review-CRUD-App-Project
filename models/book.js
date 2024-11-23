const mongoose = require('mongoose')
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  coverImage: String,
  description: String,
  numberOfPages: Number,
  status: { type: String, required: true, enum: ['Public', 'Private'] },
  ownerid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  favoritedByUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
})

const Book = mongoose.model('Book', bookSchema) // create model

module.exports = Book
