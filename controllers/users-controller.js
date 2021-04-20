const User = require('../models/users');
const path = require('path');
const fs = require('fs').promises;
const Bcrypt = require('../managers/bcrypt');
const FriendRequest = require('../models/friend-request');
const AppError = require('../managers/app-error');
class UserCtrl{
	getById(id){
        return User.findById(id);

	}
	getAll(data){ 
        const options = {
            $and: []
        };
        options.$and.push({_id: {$ne: data.userId}});
        const limit = {};
        if (data.name) {
            options.$and.push({name: new RegExp(data.name, 'i')}); 
        }

        if (data.limit) {
            limit.limit = Number(data.limit);
        }
        return User.find(options, null, limit);
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
    async friendRequest(data) {
        const {from, to} = data;
        const [user, toUser] = await Promise.all([
            User.findById(from),
            User.findById(to)
        ]);

        if (!toUser || !user || from === to) {
            throw new AppError('User not found', 404);
        }
        if (user.sentFriendRequests.includes(to) ||
            user.friends.includes(to) ||
            user.friendRequests.includes(to)) {
            throw new AppError('Bad request', 403);
        }
        user.sentFriendRequests.push(to);
        toUser.friendRequests.push(from);

        return Promise.all([user.save(), toUser.save()]);
    }
    async getFriends(data) {
        const {userId} = data;
        const user = await User.findById(userId).populate('friends', '_id name image').lean();
        if (!user) {
            throw new AppError('User Not Found', 404);
        }

        return user.friends;
    }

}

module.exports = new UserCtrl();