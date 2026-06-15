
const AsyncHandler = (fu)=> async (req,res,next)=>{
    try{
        await fu(req,res,next);
    }catch(error){
        res.status(error.status || 500).json({
            success:false,
            message:error.message || "Internal Server Error",
        })
    }
}


export default AsyncHandler;