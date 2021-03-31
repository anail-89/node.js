const express = require('express');
const router = express.Router();

router.route('/').get( (req, res)=>{
	res.end('Home page');
});

module.exports = router;