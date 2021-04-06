const express = require('express');
const router = express.Router();
const Posts = require('../models/posts');
const Users = require('../models/users');
const {body,check, param} = require('express-validator');
const {ObjectId} = require('mongoose').Types;
const ResponseManager = require('../managers/response-manager');
const AppError = require('../managers/app-error');
const validationResult = require('../middlewares/validation-result');
const PostCtrl = require('../controllers/posts-controller');
router.route('/')
.get( async (req, res) => {
    
    const responseHandler = ResponseManager.getResponseHandler(res);
        
        try { 
                const postDatas = await PostCtrl.getAll();
                responseHandler.onSuccess(postDatas, '');
        } catch (e) {
            responseHandler.onError(e);
        }
}).post(
    body('userId').custom( ( value, {req, res} )=>{
        return ObjectId.isValid(value);
    }),
    check('title','Title is required!').exists(),
    validationResult,
    async (req, res) => { 

        const responseHandler = ResponseManager.getResponseHandler(res);
    	
        try { 
                const postData = await PostCtrl.add({
                    title: req.body.title,
                    desc: req.body.desc,
                    author: req.body.userId
                });
                responseHandler.onSuccess(postData, 'Post created');
        } catch (e) {
            responseHandler.onError(e);
        }
    });

router.route('/:id').get( 
    check('id').exists(),
    async(req, res) => {
        const responseHandler = ResponseManager.getResponseHandler(res);
        try { 
                const postData = await PostCtrl.getById( req.params.id ); 
                responseHandler.onSuccess(postData, ''); 
        } catch (e) {
            responseHandler.onError(e);
        }
}).put(
    param('id').custom( ( value, {req, res} )=>{
        return ObjectId.isValid(value);
    }),
    check('userId').custom( ( value, {req, res} )=>{
        return ObjectId.isValid(value);
    }),
    check('title','Title is required!').exists(),
    validationResult,
    async (req, res) => {
        const responseHandler = ResponseManager.getResponseHandler(res);
        
        try { 
                const postData = await PostCtrl.update({
                    title: req.body.title,
                    desc: req.body.desc,
                    author: req.body.userId,
                    postId: req.params.id
                });
                responseHandler.onSuccess(postData, 'Post updated');
        } catch (e) {
            responseHandler.onError(e);
        }
}).delete( 
    check('id').exists(),
    async(req, res) => {
        const responseHandler = ResponseManager.getResponseHandler(res);
        try { 
                const postData = await PostCtrl.delete({
                    id: req.params.id
                });
                responseHandler.onSuccess({}, 'Post deleted');
        } catch (e) {
            responseHandler.onError(e);
        }
});

module.exports = router;
