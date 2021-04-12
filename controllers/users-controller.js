const User = require('../models/users');
const path = require('path');
const fs = require('fs').promises;
class UserCtrl{
	getById(id){
        return User.findById(id);

	}
	getAll(options,limit){
        return User.find( options, null, limit);
	}
	async add(data){
		if ( await User.exists( {username: data.username} ) ) {
            throw new Error('User exists');
        }else{
            const user = new User({
                name: data.name,
                image: data.file,
                username: data.username,
                password: data.password
            }); 
            
        return user.save();
        } 
	}
	async update(data){
        const user = await User.findById(data.id);
        if(user){
            await fs.unlink(path.join(__homedir, user.image));
            user.name = data.name;
            user.image= data.file;
            user.username = data.username;
            user.password = data.password;
            return user.save();
        }else{
            throw new Error('User doesn"t exists');
        }
        
        
        
        
	}
	async delete(data){
        const user = await User.findById(data.id);
        if (user) {
            await fs.unlink(path.join(__homedir, user.image));
            return user.remove(); 
        }
	}
}

module.exports = new UserCtrl();