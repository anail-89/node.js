const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const responseManager = require('../middlewares/response-handler');
const AppError = require('../managers/app-error');
const validationResult = require('../middlewares/validation-result');
const Bcrypt = require('../managers/bcrypt');
const Authentication =  require('../controllers/auth-controller');
const upload = require('../middlewares/upload');

router.route('/login').post(
	body('username').exists(),
    body('password').exists(),
    validationResult, 
    responseManager,
	async (req, res )=>{

		try { 
            const auth = await Authentication.login({
                  username: req.body.username,
                  password: req.body.password
                });
               
            res.onSuccess(auth,'Login');
        } catch (e) {
           res.onError(e);
        };
});
router.route('/register').post(
	upload.single('image'),
    body('name').exists().bail().isLength({ min:6}),
    body('password').exists().bail().isLength({min: 6}).custom(value => {
        return new RegExp("^[A-Z0-9.,/ $@()]+$").test(value);
    }),
    body('username').exists(),
    validationResult, 
    responseManager,

	async (req, res )=>{
		try { 
            const auth = await Authentication.register({
                  username: req.body.username,
                  password: req.body.password,
                  name: req.body.name,
                  image: req.file.path
                });
               
            res.onSuccess(auth,'Successfully register'); 
        } catch (e) {
           res.onError(e);
        };
	
});

module.exports = router;