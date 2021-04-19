const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email:String,
    name: String,
    image: String,
    password: String,
    isActive:{ type:String,default:false},
   friends: [{type: Schema.Types.ObjectId, ref: 'Users'}]

}, {versionKey: false, timestamps: true});
UserSchema.set('collection', 'users'); 

module.exports = mongoose.model('Users', UserSchema);
