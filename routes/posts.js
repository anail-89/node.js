const express = require('express');
const router = express.Router();
const Posts = require('../models/posts');
const Users = require('../models/users');
const {body,check, param} = require('express-validator');
const {ObjectId} = require('mongoose').Types;
const responseManager = require('../middlewares/response-handler');
const AppError = require('../managers/app-error');
const validationResult = require('../middlewares/validation-result');
const PostCtrl = require('../controllers/posts-controller');
router.route('/')
.get( responseManager,async (req, res) => {
    
    try { 
        const postDatas = await PostCtrl.getAll();
        res.onSuccess(postDatas, '');
    } catch (e) {
        res.onError(e);
    }
}).post(
    body('userId').custom( ( value, {req, res} )=>{
        return ObjectId.isValid(value);
    }),
    check('title','Title is required!').exists(),
    responseManager,
    validationResult,
    async (req, res) => { 

        try { 
            const postData = await PostCtrl.add({
                  title: req.body.title,
                  desc: req.body.desc,
                  author: req.body.userId
                });
               
            res.onSuccess(postData,'Post created');
        } catch (e) {
           res.onError(e);
        }
    });

router.route('/:id').get( 
    check('id').exists(),
    responseManager,
    async(req, res) => {
        try { 
            const postData = await PostCtrl.getById( req.params.id ); 
            res.onSuccess(postData, ''); 
        } catch (e) {
            res.onError(e);
        }
}).put(
    param('id').custom( ( value, {req, res} )=>{
        return ObjectId.isValid(value);
    }),
    check('userId').custom( ( value, {req, res} )=>{
        return ObjectId.isValid(value);
    }),
    check('title','Title is required!').exists(),
    responseManager,
    validationResult,
    async (req, res) => {
        
        try { 
            const postData = await PostCtrl.update({
                  title: req.body.title,
                  desc: req.body.desc,
                  author: req.body.userId,
                  postId: req.params.id
                });
            res.onSuccess(postData, 'Post updated');
        } catch (e) {
            res.onError(e);
        }
}).delete( 
    check('id').exists(),
    responseManager,
    async(req, res) => {
        try { 
            const postData = await PostCtrl.delete({
                  id: req.params.id
                });
            res.onSuccess({}, 'Post deleted');
        } catch (e) {
            res.onError(e);
        }
});

module.exports = router;
