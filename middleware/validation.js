 const{body, validationResult } = require('express-validator');


const vaildation=()=>{

     return [
        body('name').notEmpty().isLength({min:3}),body('price').notEmpty()
     ]
}
  



module.exports={
    vaildation
};