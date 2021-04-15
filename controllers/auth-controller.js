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
        // if(!user){
        //     throw new AppError('Username or password is wrong', 403);
        // } 
        console.log(password,user.password);
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
            `<a href="http://localhost:2021/frontend/activate.html?activation-code=${token}&_ijt=ejecqcijl13tptpech4g50mju7">Activate Profile</a>`
        );
        return user;
    }
    async activate(token) {
        const decoded = await TokenManager.decode(token);
        if (decoded.email && decoded.action === 'register') {
            const user = await UserCtrl.findOne({email: decoded.email});
            console.log(user);
            if (!user || user.isActive=== true) {
                throw new AppError('Invalid code', 403);
            }
            user.isActive = true;
            return user.save();
        }
        throw new AppError('Invalid code', 403);
    };
}

module.exports = new Authentication();