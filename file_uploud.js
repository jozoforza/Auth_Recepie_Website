const multer  = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './data/recipes_pics');
  },
  filename: function (req, file, cb) {
    console.log(req.image)
    if(!req.image){
      cb(null, 'noUpload.jpg')
    }
    cb(null, req.recipeId + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });
module.exports = {upload}