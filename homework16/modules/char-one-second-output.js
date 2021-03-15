module.exports.charOneSecondOutput = function( str ){
	let interval = setInterval(function(){
		for( let i of str ){
			console.log(i);
			if( i === str[str.length-1]){
				clearInterval(interval);
			}
		}
		
	},1000);
}