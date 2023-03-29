

module.exports.checkAdminRole = (req,res,next) =>{
    try{
        const { role} = req.user;

        if(role === "admin"){
            next();
        }else{
            return res.status(403).json({message: "for only admin."})
        }

        
    }catch(error){
        next(error)
    }
    
}