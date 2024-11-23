// This middleware was taken from the article on this link https://www.freecodecamp.org/news/simplify-your-file-upload-process-in-express-js/
const multer = require('multer')

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
// Create the multer instance
const Upload = multer({ storage: storage })

module.exports = Upload
