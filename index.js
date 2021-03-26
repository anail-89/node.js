/*1.  Ստեղծել homework իրադարձությունը լսող , որը կկանչի handler :
handler-ը պետք է արտածի Homeworks.txt պարունակությունը: emit անել homework :*/
const {EventEmitter} = require('events');
const fs = require('fs').promises;
const express = require('express');
const http = require('http');

// const homeworkEvent = new EventEmitter();
// const readable = fs.readFile('homework.txt', 'utf-8');
// homeworkEvent.on('homework', () => {
// 	readable.then( chunk =>{
// 		console.log(chunk);
// 	}).catch( err => console.error( err ) );
// });
// homeworkEvent.emit('homework');
/*2. Ստեղծել express framework-ով web aplication : Ստեղծել /users route , որին կարող են կատարել GET, POST , 
PUT և DETELE մեթոդներով request-ներ ։ Բոլորի դեպքում վերադարձնում որպես response ժամը և մեթոդի անունը։
*/
 const app = express();
 const userRouter = require('./routes/users');

 app.use(userRouter);
 http.createServer(app).listen(2021);