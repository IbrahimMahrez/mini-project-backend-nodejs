//data 
const { validationResult } = require('express-validator');

const courses=require('../models/models-schema');

const httpstatus=require('../utils/httpstatuestest');
const asyncwrapper=require('../middleware/asyncwrapper');
const AppErorr=require('../utils/appError');










const getallcourses= async(req,res)=>{

const queryParams=req.query;
const limit=queryParams.limit || 10;
const page=queryParams.page || 1;
const skip=(page-1)*limit;


    const allcourses= await courses.find({},{'__v':0}).limit(limit).skip(skip);//pagination
    
    res.json({status:httpstatus.SUCCESS,data:{allcourses}}); 
}

const singlecourses=
asyncwrapper(
async(req, res) => {
    const cours=await courses.findById(req.params.id);
    
    if (!cours) {
    
      const errrorr=   AppErorr.createError("the course with the given id was not found",404,httpstatus.FIALD);
      return next(errrorr);
      
      // return res.status(404).json({status:httpstatus.FIALD,msg:"the course with the given id was not found"});
    }
    
    
    res.json({status:httpstatus.SUCCESS,data:{cours}});
}
)

const createcourses=asyncwrapper(async(req,res,next)=>{ 

    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
          const errrorr=   AppErorr.createError("the course with the given id was not found",404,httpstatus.FIALD,errors.array());
      return next(errrorr);
      
    }
     const newCourse= new courses(req.body);
     await newCourse.save();
     res.status(201).json({status:httpstatus.SUCCESS,data:{newCourse}});
    

    });

const updatecourses=asyncwrapper(async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const errrorr=   AppErorr.createError("the course with the given id was not found",404,httpstatus.FIALD,errors.array());
        return next(errrorr);
        }
    const courseupdate=await courses.findByIdAndUpdate(
        req.params.id,
        req.body,
        { 
            new: true,
            runValidators: true
        }
    );
        
    if (!courseupdate) {
        return res.status(404).json({status:httpstatus.FIALD,msg:"the course with the given id was not found"});
    }
       
    res.status(200).json({status:httpstatus.SUCCESS,data:{courseupdate}});
});

    const deletecourses=asyncwrapper(async(req,res,next)=>{
 
      const deletecourse=await courses.findByIdAndDelete(req.params.id);
        if (!deletecourse) {
        const errrorr=   AppErorr.createError("the course with the given id was not found",404,httpstatus.FIALD);
        return next(errrorr);
        }

    res.status(200).json({status:httpstatus.SUCCESS,msg:"course deleted successfully",data:null});
});


module.exports={
    getallcourses
    ,singlecourses
    ,createcourses
    ,updatecourses
    ,deletecourses


};
