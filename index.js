 const http = require('http');
 const fs = require('fs/promises');
/*1. Ստեղծել Promise վերադարձնող ֆունկցիա , որը գեներացնում է 0 - 10 միջակայքի թիվ և ստուգում , եթե թիվը փոքր է 
5-ից reject է անում , հակառակ դեպքում resolve . Աշխատացնել ֆունկցիան և տպել արժեքները։
*/
// function getRandomNum(min,max){
// 	return Math.floor( Math.random()*( max - min + 1 ) + min );
// }
// function checkNum() {
//     return new Promise( function (resolve, reject) {
//     	const num = getRandomNum( 0, 10 );
//     	num < 5 ? reject( num ) : resolve( num );
    	
//      	}).then( (data) => console.log('Number is :',data,' and greater then 5.') ).catch( (num) => console.log('Number is: ',num,' and less than 5'));
// }
// checkNum();
/*2․ ՈՒնենք config.json ֆայլ , 
{
    "host" : "localhost",
    "port" : 3000
}
 պարունակությամբ ․ Ստեղծել սերվեր , որը լսում է json-ի մեջ լրացված հոսթին և պորտին։*/

// fs.readFile('config.json').then( (serverData)=>{
// 	//console.log(JSON.parse(serverData));
// 	const server = http.createServer( function(req, res){
//  		res.writeHead(200, {"ContentType": "application/json"});
//  		res.end('listen server');
//  	});
// 	server.listen( JSON.parse( serverData ).port, JSON.parse( serverData ).host );
// }).catch((e) => console.log(e.message));
/*3․ Ստեծել ֆունկցիա , որը input.txt ֆայլի պարունակությունը կկարդա , հետո պարունակության տեքստը կկիսի երկու 
մասի և միաժամանակ կգրի առաջին մասը output1.txt , իսկ երկրորդը output2.txt ֆայլերի մեջ։
Օգտվել 'fs/promises' գրադարանից և օգտագործել async/await:
*/
// async function func(){
// 	try{
// 		const fileData = await fs.readFile('input.txt','utf-8');
// 		await fs.writeFile('output1.txt', fileData.toString().substring(0, ( fileData.toString().length-1 ) / 2 ) );
// 		await fs.writeFile('output2.txt', fileData.substring( ( fileData.toString().length-1 )/2 ) );	
// 	}catch(e){
// 		console.log( e.message);
// 	}	
// }
// func();