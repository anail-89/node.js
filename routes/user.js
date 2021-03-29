const express = require('express');
const router = express.Router();
const upload = require('../modules/upload');
console.log(upload);
router.route('/').post(upload.single('image'), ( req, res )=>{
	res.end('file has uploaded');
});
module.exports = router;