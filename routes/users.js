const express = require('express');
const router = express.Router();

function getRes( reqMethodName ){
	return reqMethodName  + ' ' + new Date().getHours();
}

router.route('/users').get( ( req, res ) =>{
	res.write( getRes( req.method ) );
	res.end();
}).post( ( req, res )=>{
	res.write( getRes( req.method ) );
	res.end();
}).put( ( req, res )=>{
	res.write( getRes( req.method ) );
		res.end();
}).delete( ( req, res )=>{
	res.write( getRes( req.method ) );
		res.end();
});

module.exports = router;