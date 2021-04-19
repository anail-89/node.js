const User = require('../models/users');
const path = require('path');
const fs = require('fs').promises;
const Bcrypt = require('../managers/bcrypt');

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
                image: data.file ? data.file.path : undefined,
                username: data.username,
                password: await Bcrypt.hash(data.password),
                email: data.email
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
            user.email = data.email;
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
    findOne(options){
        return User.findOne(options);
    }
    async getFriendRequests(data) {
        const {userId} = data;
        const user = await User.findById(userId).populate('friendRequests', '_id name').lean();

        return user.friendRequests;
    }

}

module.exports = new UserCtrl();