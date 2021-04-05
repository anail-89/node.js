const User = require('../models/users');
class UserCtrl{
	getById(){

	}
	getAll(){

	}
	async add(req, res){
		if (await User.exists({username: req.body.username})) {
            throw new Error('User exists');
        } else {
            const user = new User({
                name: req.body.name,
                image: req.file.path
            });
            user.username = req.body.username;

            await user.save();
            res.json({
                success: true,
                data: user,
                message: 'user created'
            });
        }
	}
	update(){

	}
	delete(){

	}
}

module.exports = new UserCtrl();