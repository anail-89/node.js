const User = require('../models/users');
const Bcrypt = require('../managers/bcrypt');
const AppError = require('../managers/app-error');
const TokenManager = require('../managers/token-manager');


class Authentication{
    async login(data) {
        const {username, password} = data;
        const user = await User.findOne({username});
        if(!user){
            throw new AppError('Username or password is wrong', 403);
        }
        if(await Bcrypt.compare(password, user.password)){
            return TokenManager.encode({
                userId: user._id
            });
        }
        throw new AppError('Username or password is wrong', 403);
    }
    async register(data){ 

    	if (await User.exists({username: data.username})) {
            throw new Error('User exists');
        } else {
            const user = new User({
                name: data.name,
                image: data.image,
                password: await Bcrypt.hash(data.password),
                username: data.username
            });
            

            return user.save();
        }
    }
}

module.exports = new Authentication();