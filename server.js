const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()

const mongoose = require('mongoose')

const methodOverride = require('method-override')
const morgan = require('morgan')
const session = require('express-session')
const isSignIn = require('./middleware/is-signed-in')
const passUserToView = require('./middleware/pass-user-to-view')

const path = require('path')
const authRoute = require('./routes/auth')
const bookRoute = require('./routes/book')
const reviewRoute = require('./routes/review')

const port = process.env.PORT ? process.env.PORT : '3000'
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 150000 },
    resave: false,
    saveUninitialized: true
  })
)
app.use(passUserToView)

app.use((req, res, next) => {
  if (req.session.message) {
    console.log('req.session.message: ', req.session.message)
    res.locals.message = req.session.message
    req.session.message = null
  } else {
    res.locals.message = null
  }
  if (req.session.errmessage) {
    console.log('req.session.message: ', req.session.errmessage)
    res.locals.errmessage = req.session.errmessage
    req.session.errmessage = null
  } else {
    res.locals.errmessage = null
  }
  next()
})

// Using application routs
app.use(authRoute)
app.use(bookRoute)
app.use(reviewRoute)

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}`)
})

// landing page
app.get('/', isSignIn, async (req, res) => {
  res.render('index.ejs')
})
