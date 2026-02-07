
const express = require('express');

const controllers = require('../controllers/products.controllers');
const { vaildation } = require('../middleware/validation');

const router = express.Router();


//get products
// router.route('/')
//            .get( controllers.getallproducts)
//               .post( vaildation,controllers.createproducts)
router.route('/products')
       .get(controllers.getallproducts)
       .post(vaildation, controllers.createproducts)  // ضيف السطر ده

//get product by id
router.route('/:id')
          .get( controllers.singleproducts)
          .put( vaildation,controllers.updateprodducts)
          .delete( controllers.deleteproducts)

module.exports = router;