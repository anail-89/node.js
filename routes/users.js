const express = require('express');
const router = express.Router();
const upload = require('../modules/upload');
router.route('/').get( (req, res)=>{

}).post( upload.single('image'),(req, res)=>{
	const users = require('../users.json');
	if( Object.values(users).length > 0){
		console.log(users);
		console.log(typeof users);
		console.log(users['Liana']);
		for(let obj in users ){
			console.log(users[key]);
		 }
	}else{
		console.log('datark e');
	}
	console.log(req.file.path);
	res.write(JSON.stringify(req.body));
	res.end('ok');
});
module.exports = router;