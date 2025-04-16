import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"Not authorized",
                success:false,
            })
        }
        const decoded = await jwt.verify(token,process.env.SECRET_KEY); //& verifying the token
        if(!decoded){
            return res.status(401).json({
                message:"Invalid Token",
                success:false,
            })
        }
        req.id = decoded.id; //& setting the user id in the request object
        next(); //& calling the next middleware/route
    }   
    catch(err){
        console.log(err.message);
    }
}

export default isAuthenticated;