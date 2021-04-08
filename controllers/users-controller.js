const User = require('../models/users');
class UserCtrl{
	getById(id){
        return User.findById(id);

	}
	getAll(){

	}
	async add(data){
		if (await User.exists({username: data.username})) {
            throw new Error('User exists');
        } else {
            const user = new User({
                name: data.name,
                image: data.file.path,

            });
            user.username = data.username;
            user.password = data.password;

            return user.save();
            // res.json({
            //     success: true,
            //     data: user,
            //     message: 'user created'
            // });
        }
	}
	update(){

	}
	delete(){

	}
}

module.exports = new UserCtrl();