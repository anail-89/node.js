const express = require('express');
const upload = require('../modules/upload');
const fs = require('fs').promises;
const router = express.Router();

router.route('/').get( (req, res)=>{ 
	res.end('Method is get');
}).post( upload.single('image'),(req, res)=>{

	fs.readFile('./users.json',{ContentType: "application/json"}).then( ( data )=>{
		
		const username = req.body.username.toString();
		let jsonData = data && data.length > 0 ? JSON.parse(data) :null;
		let newArr = [];
		
		const newData = {
		 					username:{ 
		 						"username": username,
		 						"name":req.body.name,
		 						"path": req.file.path
		 						}
		 				};

		if( jsonData && Object.keys(jsonData) && Object.keys(jsonData).length > 0){
		//when json file isn't empty

			for(let key in jsonData ){

				if(req.body.username && jsonData[key]['username']['username'] === req.body.username ){ 
					res.json({success: false, data: null, message: 'username is taken'});
					res.end();
					return;
				}
			}
	
			newArr.push( ...jsonData, newData );
			fs.writeFile('./users.json', JSON.stringify( newArr )).then( (args)=>{
		 		res.status(200).json({
        			success: true,
        			data: newData,
        			message: "user created"
    			});
		 	}).catch( (e)=> console.error(e));

		}else{

			//when json file is empty
			newArr.push(newData);
		 	fs.writeFile('./users.json',JSON.stringify(newArr)).then( ()=>{
			 	res.json({success: true, data: jsonData, message: 'user created'});
				res.end();

			}).catch( (e)=> console.log(e));
			 	
		}
	}).catch((e) => console.error(e));	
});

router.route('/users/:username').get( (req, res)=>{ 
	fs.readFile('./users.json',{ContentType: "application/json"}).then( (data) =>{
			
		let jsonData = data && data.length > 0 ? JSON.parse(data) :null;
		if( jsonData && Object.keys(jsonData) && Object.keys(jsonData).length > 0){
		
			for(let key in jsonData ){
				if(req.params.username && jsonData[key]['username']['username'] === req.params.username ){ 
					res.json({success: true, data: jsonData[key]['username'],message: "Username doesn\'t find"});
					res.end();
					return;
				}
			}
		}
	
	}).catch( (e)=> console.log(e));
}).delete( (req, res)=>{
	fs.readFile('./users.json',{ContentType: "application/json"}).then( (data)=>{
		
		let jsonData = data && data.length > 0 ? JSON.parse(data) :null;
		if( jsonData && Object.keys(jsonData) && Object.keys(jsonData).length > 0){
		
			for(let key in jsonData ){
				
				if(req.params.username && jsonData[key]['username']['username'] === req.params.username ){ 
					res.json({success: true, data: jsonData[key]['username'], message: "Userdata data deleted successfully!"});
					res.end();
					let newData = [];
					if( key == 0 && Object.keys(jsonData).length > 1){ 
						newData = [...jsonData.slice(1)];
					}else if(key == 0 && Object.keys(jsonData).length === 1){
						newData = [];
					}else if( key == Object.keys(jsonData).length -1 ){
						newData = [...jsonData.slice(0,key)];
					}else{
						newData = [...jsonData.slice(0,key),...jsonData.slice( key+1)];
					}
					
					fs.writeFile('./users.json', JSON.stringify(newData),(err, data)=>{
						console.log('delete user data');
					});
					return;
				}
					
			}
			res.json({success: false, data: null, message: "Username doesn\'t find" });
			res.end();
		}
	
	}).catch( (e)=> console.log(e));
});
module.exports = router;
