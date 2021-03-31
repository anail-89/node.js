const express = require('express');
const router = express.Router();
const fs =  require('fs').promises;
const path = require('path');
const usersFilePath = path.join(__homedir,'users.json');
router.route('/').get( async(req, res)=>{
	const users = Object.values( await fs.readFile(usersFilePath, 'utf-8'));
	if( req.query.name){
		users = users.filter(user => user.name.includes(req.query.name));
	}
	if( req.query.filter){
		users = users.slice(0, Number( req.query.filter));
	}
	res.json({success: true,
			data: users});
}).
router.route('/:username').get( async (req, res)=>{
	const users = await fs.readFile(usersFilePath,'utf-8');
	if(users[req.params.username]){
		res.json({ success: true,
					data: users[req.params.username]});

	}else {
        res.json({
            success: false,
            data: null,
            message: 'User not fond'
        });
    }
}).post((req, res)=>{

});
module.exports = router;