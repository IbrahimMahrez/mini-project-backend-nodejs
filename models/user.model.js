const mongoose = require('mongoose');
const validator = require('validator');
const { userroles } = require('../utils/roles');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
       
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, 'Invalid email']
    },
    password: {
        type: String,
        required: true,
        
    },
    token:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:[userroles.ADMIN,userroles.USER,userroles.MANGER],
        default:userroles.USER
    },
    avatar:{
        type:String,
        default:'uploads/profile.png'
    }
  

});

// حط الـ unique في index منفصل
userSchema.index({ username: 1 }, { unique: true, background: true });
userSchema.index({ email: 1 }, { unique: true, background: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
