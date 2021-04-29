const User = require('../models/users');
const path = require('path');
const fs = require('fs').promises;
const Bcrypt = require('../managers/bcrypt');
const AppError = require('../managers/app-error');
class UserCtrl{

	async add(data){
		if ( await User.exists( {email: data.email} ) ) {
            throw new Error('User exists');
        }else{
           
            const user = new User({

                password: await Bcrypt.hash(data.password),
                email: data.email
            }); 
            
        return user.save();
        } 
	}
	

}

module.exports = new UserCtrl();