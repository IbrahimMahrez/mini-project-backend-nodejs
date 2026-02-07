class AppErorr extends Error{
    constructor(){
        super();
        
    }
    createError(message,statusCode,status){
        this.message=message;
        this.statusCode=statusCode;
        this.status=status;
        return this;
    }

}

module.exports=new AppErorr();
