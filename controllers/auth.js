const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

const newsignin = async (req, res) => {
  res.render('auth/sign-in.ejs')
}
const signin = async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username })
    if (!userInDatabase) {
      return res.send('Login failed. Please try again')
    }
    const validPassword = bcrypt.compareSync(
      req.body.password,
      userInDatabase.password
    )
    if (!validPassword) {
      return res.send('Login failed. Please try again.')
    }
    //log the username
    req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id
    }
    req.session.message = 'Successfully logged in'
    res.redirect('/')
  } catch (err) {
    console.log(err)
    req.session.errmessage = 'Please try again later ........'
  }
}
const signup = async (req, res) => {
  res.render('auth/sign-up.ejs')
}
const signupSubmit = async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username })
  if (userInDatabase) {
    return res.send('Username already Taken')
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.send('Password and Confirm Password must Match')
  }
  //Register the user
  // bcrypt for password encryption
  const hashedPassword = bcrypt.hashSync(req.body.password, 10)
  req.body.password = hashedPassword

  // save / create the user
  const user = await User.create(req.body)
  //req.session.message = 'Welcome to the Book Review App. Please sign in!'
  res.render('auth/sign-in.ejs')
}
const signout = async (req, res) => {
  req.session.destroy()
  res.redirect('/')
}
module.exports = {
  signin,
  newsignin,
  signup,
  signupSubmit,
  signout
}

// router.get('/sign-in', (req, res) => {
//   res.render('auth/sign-in.ejs')
// })

// router.get('/sign-out', (req, res) => {
//   req.session.destroy()
//   res.redirect('/')
// })
// module.exports = router
