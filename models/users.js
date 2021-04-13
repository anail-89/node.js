const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email:String,
    name: String,
    image: String,
    password: String,
    isActivate:{ type:String,default:false}

}, {versionKey: false, timestamps: true});
UserSchema.set('collection', 'users'); 

module.exports = mongoose.model('Users', UserSchema);
