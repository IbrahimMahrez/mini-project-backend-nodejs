


const users = require('../models/user.model');
const httpstatus=require('../utils/httpstatuestest');
const asyncwrapper=require('../middleware/asyncwrapper');
const AppErorr=require('../utils/appError');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generatetoken = require('../utils/generatetoken');







// جلب جميع المستخدمين مع دعم pagination
const getallusers= asyncwrapper(async(req,res)=>{
const queryParams=req.query;
const limit=queryParams.limit || 10;
const page=queryParams.page || 1;
const skip=(page-1)*limit;
    const allusers= await users.find({},{'__v':false,password:false}).limit(limit).skip(skip);//pagination
    res.json({status:httpstatus.SUCCESS,data:{allusers}}); 
});


// تسجيل مستخدم جديد
const registeruser = asyncwrapper(async(req, res,next) => {
    const olduser = await users.findOne({email: req.body.email});
    if (olduser) {
        const errrorr=   AppErorr.createError("the user with the given email already exists",400,httpstatus.FIALD);
        return next(errrorr);
        }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);    
    const newuser = new users({...req.body,password:hashedPassword,avatar:req.file.filename});
    const token= await generatetoken({email:newuser.email,id:newuser._id,role:newuser.role})
    newuser.token=token;
    await newuser.save();
        res.status(201).json({
        status: httpstatus.SUCCESS,
        data: { newuser }
    });
    console.log('✅ 5. Response sent');
});





// تسجيل الدخول
const loginuser = asyncwrapper(async(req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        const errrorr = AppErorr.createError(
            "Email and password are required", 
            400, 
            httpstatus.FIALD
        );
        return next(errrorr);
    }
    const user = await users.findOne({ email });
    if (!user) {
        const errrorr = AppErorr.createError(
            "Invalid email or password", 
            400, 
            httpstatus.FIALD
        );
        return next(errrorr);
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        const errrorr = AppErorr.createError(
            "Invalid email or password", 
            400, 
            httpstatus.FIALD
        );
        return next(errrorr);
    }
        const Token= await generatetoken({email:user.email,id:user._id,role:user.role})
       
    res.json({
        status: httpstatus.SUCCESS,
        data: { 
            token: Token,
            message: "User logged in successfully"
        }
    });
});






module.exports={
    getallusers,
    registeruser,
    loginuser
};