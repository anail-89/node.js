const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const path = require('path');
const {Types} = require('mongoose');
const fs = require('fs').promises;
const User = require('../models/users');
const UserCtrl = require('../controllers/users-controller');
const {body, param, check} = require('express-validator');
const responseManager = require('../middlewares/response-handler');
const AppError = require('../managers/app-error');
const validationResult = require('../middlewares/validation-result');
const Bcrypt = require('../managers/bcrypt');
const usersJsonPath = path.join(__homedir, './users.json');
const validateToken = require('../middlewares/validation-token');
router.route('/').get(
 responseManager,
 validateToken,
 async (req, res) => {
    try { 
            const users = await UserCtrl.getAll({
                name: req.query.name,
                userId: req.decoded.userId
            });
            res.onSuccess(users);
    } catch (e) { 
        res.onError(e); 
    }
}).post( 
    upload.single('image'),
    body('name').exists().bail().isLength({ min:6}),
    body('password').exists().bail().isLength({min: 6}).custom(value => {
        return new RegExp("^[A-Z0-9.,/ $@()]+$").test(value);
    }),
    validationResult, 
    responseManager,
    async (req, res) => {

        try {

            let userdata = await UserCtrl.add({
                username: req.body.username,
                name: req.body.name,
                file: req.file.path,
                password: await Bcrypt.hash(req.body.password)
            });
            userdata = userdata.toObject(); 
            delete userdata.password;
            res.onSuccess(userdata,'User created');

        } catch (e) {
            await fs.unlink(path.join(__homedir, req.file.path));
            res.onError(e); 
        }
});
router.post('/current',
    responseManager,
    validateToken,
    async (req, res) => {
        try {
            const user = await UserCtrl.getById(req.decoded.userId);
            res.onSuccess(user);
        } catch (e) {
            res.onError(e);
        }

    }
);
router.route('/friends').get(
    responseManager,
    validateToken,
    async (req, res) => {
        try {
            const friends = await UserCtrl.getFriends({
                userId: req.decoded.userId
            })
            res.onSuccess(friends);
        } catch (e) {
            res.onError(e);
        }
    }
);  
router.route('/find-send-friend-request-users').get(
    responseManager,
    validateToken,
    async (req, res)=>{ 
        try {
            const sendRequsests = await UserCtrl.getFriendRequestsSendByMe({
                    userId: req.decoded.userId
                });
            res.onSuccess(sendRequsests);
        } catch (e) {
            res.onError(e);
        }
    }

    );
router.route('/friend-request').post(
    responseManager,
    body('to').exists(),
    validateToken,
    async (req, res) => {
        try {
            await UserCtrl.friendRequest({
                from: req.decoded.userId,
                to: req.body.to
            });
            res.onSuccess();
        } catch (e) {
            res.onError(e);
        }
    }
).get(
    responseManager,
    validateToken,
    async (req, res) => {
        try {
            res.onSuccess(
                await UserCtrl.getFriendRequests({
                    userId: req.decoded.userId
                })
            );
        } catch (e) {
            res.onError(e);
        }
    }
);

router.route('/:id').get( responseManager, async (req, res) => {
    // Types.ObjectId.isValid(req.params.id);
    try{
         const user = await UserCtrl.getById(req.params.id);
         res.onSuccess(user, '');
    }catch(e){
        res.onError(e);
    }
}).put(

    upload.single('image'),
    param('id').custom( ( value, {req, res} )=>{
        return ObjectId.isValid(value);
    }),
    check('name','Name is required!').exists(),
    check('username','UserName is required!').exists(),
    responseManager,
    validationResult,
    async (req, res) => {
        try {

            let userdata = await UserCtrl.update({
                username: req.body.username,
                name: req.body.name,
                file: req.file.path,
                password: await Bcrypt.hash(req.body.password),
                id:req.params.id
            });
            userdata = userdata.toObject(); 
            delete userdata.password;
            res.onSuccess(userdata,'User updated');

        } catch (e) {
            await fs.unlink(path.join(__homedir, req.file.path));
            res.onError(e); 
        }
          
}).delete(
    check('id').exists(), 
    responseManager,
    async(req, res) => {
        try { 
            const postData = await UserCtrl.delete({
                  id: req.params.id
                });
            res.onSuccess({}, 'User deleted');
        } catch (e) {
            res.onError(e);
        }
});



module.exports = router;
