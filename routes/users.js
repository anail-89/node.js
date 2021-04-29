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
const validateToken = require('../middlewares/validation-token');
router.route('/register').post( 
     upload.single('image'),
    validationResult, 
   responseManager,
    body('email').exists().bail(),
    body('password').exists().bail().isLength({min: 6}).custom(value => {
        return new RegExp("^[A-Z0-9.,/ $@()]+$").test(value);
    }),

    async (req, res) => {
        console.log('hello');
        try {

            let userdata = await UserCtrl.add({
                email: req.body.email,
                password: await Bcrypt.hash(req.body.password)
            });
            userdata = userdata.toObject(); 
            delete userdata.password;
            res.onSuccess(userdata,'User created');

        } catch (e) {
        
            res.onError(e); 
        }
});
module.exports = router;