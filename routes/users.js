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

router.route('/').get( responseManager,async (req, res) => {
    try { 
        const options = {};
        const limit = {};
        if (req.query.name) {
            options.name = req.query.name;
        } 
        if (req.query.limit) {
            limit.limit = Number(req.query.limit);
        }
        const userDatas = await UserCtrl.getAll( options, limit );
        res.onSuccess(userDatas, '');
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
