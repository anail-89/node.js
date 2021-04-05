const express = require('express');
const router = express.Router();
const Posts = require('../models/posts');
const Users = require('../models/users');
router.route('/').get( async (req, res) => {
    const posts = await Posts.find().populate({
    	path: 'author',
    	select: 'name username -_id'});
    res.json(posts);
}).post(async (req, res) => {
	const user = await Users.findById(req.body.userId);
	if( !user ){
		throw new Error("User don't found");
	}
    const post = await new Posts({
    	title: req.body.title,
    	desc:  req.body.desc,
    	author: user._id
    }).save();
    res.json(post);
});

router.route('/:id').get((req, res) => {
    console.log(req.params);
    res.end('Method GET');
}).delete((req, res) => {
    //deleteFromDataBase(req.params.id);
    res.end('Method Delete');
});

module.exports = router;
