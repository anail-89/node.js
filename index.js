/*1.Գրել ծրագիր, որը կստուգի , եթե req.url /sunny է, ապա console-ում տպի Yes.*/
const http = require('http');
const url = require('url');
const fs = require('fs');

// const server = http.createServer((req, res)=>{
// 	if(req.url === '/sunny'){
// 		console.log('yes');
// 	}

// });
// server.listen(3000);
 
 /*2.Server-ում ունենք sunny.txt ֆայլ: Ստեղծել սերվեր, որին հարցում ուղարկելիս եթե կա query-ի մեջ file դաշտը և այն 
 հավասար է "sunny", որպես response ստանա sunny.txt պարունակությունը այլապես 404 status-ով ստանա "File Not Found".
  (Օգտագործել Get մեթոդը):*/

// const server = http.createServer( ( req, res)=>{
// 	const urlData = url.parse(req.url, true);
//    	if( urlData.query.file && urlData.query.file === 'sunny'){
//    		const readStream = fs.createReadStream( './sunny.txt','utf-8');
//    		readStream.on( 'data', chunk => { 
//          res.writeHead(200);
//    		   res.write(chunk);
//    			 res.end();
   			
//    		}).on('end', ()=> console.log('end read file') ).on('error', err => console.log(err) );

//    	}else{

//    		res.writeHead(404);
//    		res.end("File field dosn\'t exists or file field is not sunny");
   		
//    	}
//    	res.on('finish', ()=>console.log('finish') ).on('error', err => console.log(err) );
// });
// server.listen(3000);
/*3. Server-ում ունենք users.json ֆայլ, որը զանգված է կազմված "fisrt_name", "last_name", "email", "age" դաշտեր պարունակող 
օբյեկտներից ։ Ստեղծել սերվեր, որին հարցում ուղարկելիս եթե կա query-ի մեջ filter դաշտը , վերադարձնել users.json-ից զանգված 
միայն այն օբյեկներից , 
որոնց "fisrt_name" կամ "last_name" պարունակում է filter-ի արժեքը։*/
// const server = http.createServer((req, res)=>{
// 	const urlData = url.parse(req.url, true);
//   	if( urlData.query.filter && urlData.query.filter.length >0){
  		
//   		const filter = urlData.query.filter;
//   		fs.promises.readFile('user.json',{ContentType: 'application/json'}).then( (data)=>{
//   			let resArr = [];
//   			for(let obj of JSON.parse(data) ){
//   				if(obj.fisrt_name === filter || obj.last_name === filter){
// 					resArr.push(obj);
//   				}
  				
//   			}
//   			if(resArr.length > 0){
//   				res.writeHead(200, {"contentType": "application/json"});
//   				res.write(JSON.stringify(resArr));
//   				res.end();
  				
//   			}
//   			res.on('error', (err)=> console.log(err));
//   		}).catch((e)=> console.log(e));	
//   	}else{
//   		res.statusCode= 404;
//   		res.end('data not found');
//   	}
  
// });
// server.listen(2000);
/*4․ Ստեղծել myMap մեթոդ Array-ի համարար , որը կաշխատի ինչպես map մեթոդը. [].map(fn) -ը կարողանանք գրել [].myMap(fn) -ի 
միջոցով ։*/
// String.prototype.FirstTwoLetterUpperCase = function( ){
// 	return this[0].toUpperCase() + this[1].toUpperCase() + this.slice(2);
// }
// console.log( 'liana'.FirstTwoLetterUpperCase() ); 
// Array.prototype.myMap = function( func){
// 	const returnedArray = [];
// 	for( let i=0; i< this.length; i++){

// 		returnedArray.push( func(this[i],i, this));
// 	}
// 	return returnedArray;
// }
// const arr3 = [1,2,3].myMap( (val, i, array)=>{
// 	return Math.pow(val,2);
// });
// const arr2 = [1,2,3].map( (value, index, array)=>{

// 	return Math.pow(value,2);
// });
// console.log(arr2);
// console.log(arr3);
