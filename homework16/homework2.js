/*2. Ստեղծել package.json  ֆայլ որը կունենա  home2.jpg տեսքը, որտեղ author դիմաց կլինի Ձեր անուն ազգանունը:
homework2.js ֆայլի միջոցով օգտագործելով random փաթեթը  console-ում արտածել 5 պատհական int արժեքներ 0 - 100 միջակայքում:
*/
const random = require('random');
let i = 0;
while ( i < 5 ){
	console.log( random.int( 0, 100 ) );
	i++;
}