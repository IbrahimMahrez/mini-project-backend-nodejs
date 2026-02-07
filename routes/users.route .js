
const express = require('express');
 const{body, validationResult } = require('express-validator');
const { vaildation } = require('../middleware/validation');
const verfiytoken=require('../middleware/verifaytoken')
const userscontrollers = require('../controllers/users.controller');
const multer=require('multer');
const { extend } = require('lodash');
const AppErorr=require('../utils/appError')




const diskstorage=multer.diskStorage({
    destination :function(req,file,cb){
        console.log("file",file);
        cb(null,'uploads')
        
    },   

    //img
    filename:function(req,file,cb){
        const ext=file.mimetype.split('/')[1]
        const fileName=`user-${Date.now()}.${ext}`
        cb(null,fileName)
    }
})
const fileFilter=(req,file,cb)=>{

    const imgtype=file.mimetype.split('/')[0];
    if(imgtype ==='image'){
        return cb(null,true)

    }else{
        return cb(AppErorr.createError(
                    "img only ", 
                    400, 
                    false
                ))
    }
}


const upload=multer({storage:diskstorage,
    fileFilter:fileFilter})


const router = express.Router();

//get courses
router.route('/')
            .get(verfiytoken,userscontrollers.getallusers)


router.route('/register')
            .post(upload.single('avatar'), userscontrollers.registeruser)


router.route('/login')
            .post( userscontrollers.loginuser)
            




module.exports = router;