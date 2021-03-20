/*
1. Ստեղծել readStream որը input.txt-ից կկարդա ինֆորմացիան 10 բայթով և կաևտածի կոնսոլում այն chunk-երը ,
 որոնք հատուկ սիմվոլներ չունեն:*/
const {Readable, Duplex, Writable, Transform} = require('stream');
 const fs = require('fs');
// const readFileWithStream = fs.createReadStream('input.txt',{ highWaterMark:10});
// readFileWithStream.on('data', (chunk)=>{

//      if ( !/[@#$%\^!\(\)\+\{\}\\\.]/gmi.test( chunk.toString() ) ) {
//             console.log( chunk.toString() );
//     }
// });
// readFileWithStream.on('error', (err) => {
//      throw new Error( err );
// });
/*2.Գրել ծրագիր որ լատինատառ տեքստը որևէ մոտավորությամբ կսարքի հայատառ: Օրինակ ա տառը կդառնա a:Այդպես 
բոլոր տառերը: Ստեղծել readStream և highWaterMark:1  նշելով բոլոր սիմվոլների վրայով անցնել: 
Ծրագիրը աշխատացնել homework4Eng.txt համար:*/
// const englishAlpabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
// const armenianAlpabet = ['Ա','Բ','Ս', 'Դ', 'Ե', 'Ֆ', 'Գ', 'Հ', 'Ի', 'Ջ', 'Ք', 'Լ', 'Մ', 'Ն', 'Օ', 'Պ', 'Ք', 'Ռ', 'Ս', 'Տ', 'ՈՒ', 'Վ', 'Վ', 'Ղ', 'Ա', 'Զ'];
// const readFileWithStream = fs.createReadStream('homework4eng.txt','utf-8',{highWaterMark:1});

// readFileWithStream.on('data', (chunk) =>{ 
//  let newContent ='';
//  const writeDatas = fs.createWriteStream('homework4eng.txt');
//  for(let val of chunk.toString()){

//      newContent +=englishAlpabet.indexOf(val.toUpperCase()) > -1 ? armenianAlpabet[englishAlpabet.indexOf(val.toUpperCase())] : val;
//  }
//  writeDatas.write(newContent);
    
// });
// readFileWithStream.on('error',(err)=>{ console.log(err.message)});
/*3.Ստեղծել  RemoveSpecialCharsկլաս, որը ժառանգում է  Transform կլասին: _transform մեթոդը վերասահմանել
 այնպես, որ իր միջով անցնող տեքստից հեռացնել հատուկ սիմվոլները:

Կլասից ստեղծել օբեկտ: homeworkr5.txt պարունակությունը pipe անել օբեկտով և պահապանել homeworkw5.txt ֆայլում:
*/
const readStream = fs.createReadStream('homeworkr5.txt', {
    highWaterMark: 1
});
const writeStreame = fs.createWriteStream('homeworkw5.txt');
class RemoveSpecialChars extends Transform{
    constructor(char){
        super();
        //this.withoutSpecialChar = char;
        //console.log(withoutSpecialChar);
    }
    _transform(chunk, encoding, next) {
        let newStr = '';
        
            if ( !/[@#$%\^!\(\)\+\{\}\\\.]/gmi.test( chunk.toString() ) ) {
                newStr += chunk;
            }else{
                newStr += '';
            }

        this.push(newStr);
        next();
        
    }
    _flush( callback){
        this.push('transforms...');
        callback();
    }
}
const newObj = new RemoveSpecialChars();
readStream.pipe(newObj).pipe(writeStreame);

/*4.Ստեղծել Promise վերադարձնող ֆունկցիա որը ստանում է տեքստ ֆայլի հասցե և տեքստի բառերի առաջին տառերը 
սաքում մեծատառ․ */

//  function changeText(src) {

//     return new Promise( function (resolve, reject) {
//       const readFileWithStream = fs.createReadStream(src,'utf-8');
//       readFileWithStream.on('data', (chunk)=>{
//          const newChunk = chunk.split(" ").map((word)=>{
//              return word.charAt(0).toUpperCase() + word.slice(1);
//          });

//          resolve(newChunk.join(" "));
//       });
//       readFileWithStream.on('error',(err)=>{ console.log(err.message)});
        
//     });
// }
// changeText('task-4.txt').then( (chunk) => { 
//  const writeStreame = fs.createWriteStream('task-4.txt');
//  writeStreame.write(chunk);
// }).catch( (err) => console.log("Can\'t push chunk",err));
