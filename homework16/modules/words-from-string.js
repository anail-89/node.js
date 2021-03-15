module.exports.wordsFromString = function( str ){
	str.split(" ").forEach( function( elem ){
		console.log( elem.search( /[@#$%\^!\(\)\+\{\}\\\.]/gmi ) !== -1 ? '' : elem );
	});
}