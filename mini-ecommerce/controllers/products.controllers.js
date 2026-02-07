const { statusCode } = require('../../utils/appError');
const Product = require('../models/models-schema');
const httpstatus=require('../utils/httpstatuestest');
const asyncwrapper=require('../middleware/asyncwrapper');
const AppErorr=require('../utils/appError');


const getallproducts= asyncwrapper(async (req, res) => {
    console.log('✅ Request reached controller!'); // ضيف السطر ده
    
    const queryParams=req.query;
    const limit=queryParams.limit || 10;
    const page=queryParams.page || 1;
    const skip=(page-1)*limit;

    const products = await Product.find({},{'__v':0}).limit(limit).skip(skip);
    console.log('✅ Products found:', products.length); // وده كمان
    res.status(200).json({status:httpstatus.SUCCESS,data:{products}});
})

const singleproducts=  asyncwrapper(async (req, res) => {
    
        const product = await Product.findById(req.params.id);
        if (!product) {
             const errrorr=   AppErorr.createError("the course with the given id was not found",404,httpstatus.FIALD);
             return next(errrorr);
        }
        res.json({status:httpstatus.SUCCESS,data:{product}});
    
    
})



const createproducts = asyncwrapper(async (req, res, next) => {
    console.log('📥 Create product request:', req.body);
    
    // Check validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('❌ Validation errors:', errors.array());
        const error = AppErorr.createError(
            "Validation failed", 
            400,
            httpstatus.FIALD, 
            errors.array()
        );
        return next(error);
    }
    // Create and save product
    console.log('✅ Validation passed, creating product...');
    const product = new Product(req.body);
    
    await product.save();
    console.log('✅ Product saved:', product._id);
    
    res.status(201).json({
        status: httpstatus.SUCCESS,
        data: { product }
    });
});



const updateprodducts=asyncwrapper(async (req, res) => {
   
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!product) {
            const error = AppErorr.createError("Product not found", 404, httpstatus.FIALD);
            return next(error);
        }
        res.json({status:httpstatus.SUCCESS,data:{product}});
    
})


const deleteproducts=  asyncwrapper(async (req, res) => {
    
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            const error = AppErorr.createError("Product not found", 404, httpstatus.FIALD);
            return next(error);
        }
        res.json({status:httpstatus.SUCCESS,data:{product}});
    
})







module.exports={
    getallproducts,
    singleproducts,
    createproducts,
    updateprodducts,
    deleteproducts
};