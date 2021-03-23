//1. Գրել ծրագիր որը կստեղծի ֆայլ Ձեր համակարգչի user անունով և այդ ֆայլում գրել համակարգչի userinfo-ն:
// const fs = require('fs');
// fs.writeFile(process.env.USERNAME,JSON.stringify(process.env), {"ContentType": "application/json"},(err, data)=>{
// 	if(err){
// 		return console.error( err);
// 	}
// 	console.log('write');
// });

/*2. Գրել ծրագիր որ նախորդ առաջադրանքի կողմից ստեղծված ֆայլ կանվանափոխի այդ պահի ամիս, օր, ժամ, րոպեով, վայրկյանով 
(Օրինակ 10_11_15_32_13.txt):
*/


//fs.readFile(path.join(__dirname, '..', '..', 'foo.bar'));
const fs = require('fs');
var path = require("path");

// fs.rename(path.join(__dirname,'..','/homework19/','homeworkr5.txt'),path.join(__dirname,'..','/homework19/','input.txt'), function(err){
	
// 		if (err) throw err;
	
// 		console.log('renamed');
	
// });
/*3.Գրել ծրագիր, որը կկարդա homework3.txt ֆայլի պարունակությունը, տեքստից կհեռացնի  ստորակետները  և կգրի replace.txt ֆայլում,
որից հետո ջնջել homework3.txt ֆայլը:*/
// fs.readFile('homework3.txt','utf-8', (err, data)=>{
// 	if(err) throw err;
	
// 	fs.writeFile('replace.txt',data.split(',').join(''),(err, data)=>{
// 		if(err) throw err;
// 	});
// 	fs.unlink('homework3.txt', (err)=>{
// 		if(err) throw err;
// 	});
// });
/*4.Ունենք const web=['html','css','js','txt'] զանգված: Գրել ծրագի որ կստեղծի զանգվածի անունով պապկա: Զանգվածի անդամներից այդ
 պապկայում ստեղծել  ֆայլեր հերթական անդամի անունով և վերջավորությունն էլ նույնը լինի(օրինակ html.html) պարունակություն էլ այդ 
 անդամը:*/
 // const web = ['html','css','js','txt'];
 // fs.mkdir('web',(err)=>{
 // });
 // for( let elem of web ){ 

 // 	fs.writeFile( path.join( __dirname,'/web/',`${elem}.${elem}`), elem.toString(), (err)=>{
 // 		if(err) throw err;
 // 	});
 // }
/*5.Գրել ծրագիր որ կկարդա Homework5 պապկայի ֆայլերը,  կստեղծի newDir պապկա և այնտեղ կտեղափոխի այն ֆայլերը իրենց
պարունակություններով որոնք 1kB մեծ են :*/

function getdirFiles(dir){ console.log(dir);
	fs.readdir( dir,( err, files )=>{
		if(err) throw err;

		fs.mkdir(path.join(dir.slice(0,dir.lastIndexOf('\\')),'/','newDir'),(err)=>{
			if(err) throw err;
		});
		 files.forEach((file,index)=>{
		 	const filePath = path.join(dir,'/',`${file}`);console.log(filePath);
		 	const newFilePath = path.join(dir.slice(0,dir.lastIndexOf('\\')),'/','/newDir/',`${file}`);console.log(newFilePath);
		 	
		 	
			fs.stat(filePath,(err,stats)=>{
				if(err) return console.error(err);
				if(stats.isFile() && stats.size > 1024 ){
					fs.readFile(filePath,'utf-8',(err,data)=>{
						if(err) throw err;
						fs.writeFile(newFilePath,data,'utf-8',(err)=>{
							if(err) throw err; 
						});
					});
				}
			});
				
		});
	});
}

getdirFiles(path.join( __dirname,'homework5'));
