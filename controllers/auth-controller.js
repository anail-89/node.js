const User = require('../models/users');
const Bcrypt = require('../managers/bcrypt');
const AppError = require('../managers/app-error');
const TokenManager = require('../managers/token-manager');
const UserCtrl = require('../controllers/users-controller');
const email = require('../managers/email-manager');
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
        const user = await UserCtrl.add(data);
        const token = TokenManager.encode({
            email: user.email,
            action: 'register'
        }, 3600);
        await email(user.email, 'Node js register',
            `<a href="http://localhost:63342/nodejs-frontend/activate.html?activation-code=${token}&_ijt=ejecqcijl13tptpech4g50mju7">Activate Profile</a>`
        );
        return user;
    }
}

module.exports = new Authentication();