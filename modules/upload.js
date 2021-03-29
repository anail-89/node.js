const multer  = require('multer');
const mimeType = require('mime-types');
const random = require('random');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
  	let randomName  = '';
  	let i=0;
  	while( i<6){
  		randomName += random.int(0,10).toString();
  		i++;
  	}
    cb(null, randomName + '.' + mimeType.extension(file.mimetype));
  }
});

module.exports = multer({ storage: storage });