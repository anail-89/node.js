const os = require('os');
const fs = require('fs');
/*1.  Գրել ծրագիր որը աշխատացնելիս console-ում կարտածի ամբողջ օպերատիվ հիշողությունը (total amount of 
system memory):
*/
// console.log( Math.ceil( os.totalmem() / Math.pow( 1024, 3 ) )+ ' GB');
//2. Գրել ծրագիր որ աշխատացնելիս console-ում կարտածի IPv4 IP հասցեն(os.networkInterfaces()):
// const network = os.networkInterfaces();
// network['Ethernet 2'].forEach( function( interface ){
// 	if( interface.family === 'IPv4' ){
// 		console.log( interface.cidr );
// 	}
// });
/*3.Գրել ծրագիր որը աշխատացնելիս կստեղծի 8 նիշանոց պատահական թվերից կազմված անուն ունեցող txt ֆայլ և այդ ֆայի մեջ 
Օպերացիան համակարգի central processing unit (CPU) քանակը(os.cpus()):
*/
// function random(min, max){
// 	return Math.floor( Math.random()*( max - min + 1 ) + min);
// }
// let str = "";
// for( let i = 0; i < 8; i++){
// 	str += random(0,9); 
// }
// if( str ){
// 	fs.writeFile( str +'.txt', os.cpus().length.toString(),( ) => console.log('write') );
// }
/*4.Գրել ծրագիր որ աշխատացնելիս  input.txt կկարդա պարունակությունը , որից հետո այդ պարունակության բոլոր բացատները
կփոխարին - ներով: Այնուհետև գծիկներով տեքստ գրել write.txt ֆայլում:
*/
// fs.readFile('input.txt','utf8', function( err, data ){
// 	if(err){
// 		console.log(err);
// 	}
// 	fs.writeFile('write.txt', data.split(" ").join("-"),'utf8',() => console.log('write'));
// });
/*5.Գրել ծրագիր որ աշխատացնելիս sync կկարադա նախորդ չորս տնայիների ֆայլերի պարունակությունը(Օրինակ homework1.js, 
homework2.js, homework3.js, homework4.js): 
Այնուհետև ծրագիրը պետք է ստեղծի txt ֆայլ, որի անուն կազմված կլնի օպերացոն համակարգի անունից և այդ պահին ժամ րոպե 
վարկյանից(win32_14_14_58.txt)   
և այդ ֆայլում գրել նախորդ ֆայլերի պարունակությունը:
*/
// let readMeText = "";
// try{
// 	readMeText += fs.readFileSync('./homework16/homework1.js') + "\n";
// }catch(e){
// 	console.log(e.message);
	
// }
// try{
// 	readMeText += fs.readFileSync('./homework16/homework2.js') + "\n";
// }catch(e){
// 	console.log(e.message);
// }
// try{
// 	readMeText += fs.readFileSync('./homework16/homework3.js') + "\n";
// }catch(e){
// 	console.log(e.message);
// }
// try{
// 	readMeText += fs.readFileSync('./homework16/homework4.js');
// }catch(e){
// 	console.log(e.message);
// }
// const now = new Date();
// fs.writeFile( os.platform() + "_" + now.getHours() + "_" + now.getMinutes() + "_" + now.getSeconds() + '.txt', readMeText, () => console.log('write') );
