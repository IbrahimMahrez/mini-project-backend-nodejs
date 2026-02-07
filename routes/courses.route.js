
const express = require('express');
 const{body, validationResult } = require('express-validator');
const controllers = require('../controllers/courses.contoller');
const { vaildation } = require('../middleware/validation');
const verfiytoken = require('../middleware/verifaytoken');
const { userroles } = require('../utils/roles');
const allowedTo=require('../middleware/allowedTo')
const router = express.Router();

//get courses
router.route('/')
            .get( controllers.getallcourses)
            .post( vaildation,controllers.createcourses)
//get course by id



router.route('/:id')
          .get( controllers.singlecourses)
          .patch( vaildation,controllers.updatecourses)
          .delete( verfiytoken,allowedTo(userroles.ADMIN,userroles.MANGER),controllers.deletecourses)

//create course


//update course


//delete course
// router.delete('/:id', controllers.deletecourses);

module.exports = router;