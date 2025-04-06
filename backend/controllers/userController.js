import {User} from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const register = async (req,res) =>{
     try{
        //& destructuring the data from the request body
        const {fullName,email,phoneNumber,password,role} = req.body;

        //& checking if the data is present or not
        if(!fullName || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message:"All fields are required",
                success:false,
            });
        }

        const user = await User.findOne(email); 
        
        //& checking if the user already exists
        if(user){ 
            return res.status(400).json({
                message:"Email id already exists",
                success:false,
            })
        }

        const hashedPassword = await bcrypt.has(password,10); //& hashing the password
     
        const newUser = await User.create({
            fullName,
            email,
            phoneNumber,
            password:hashedPassword,
            role,
        })
    }
     catch(err){
         
     }
}


export const login = async (req,res) =>{
    try{
        //& destructuring the data from the request body
        const {email,password,role} = req.body;

        //& checking if the data is present or not
        if(!email || !password || !role){
            return res.status(400).json({
                message:"All fields are required",
                success:false,
            });
        }

        const user = await User.findOne({email}); 
        
        //& checking if the user already exists
        if(!user){ 
            return res.status(400).json({
                message:"Invalid credentials",
                success:false,
            })
        }

        const isMatch = await bcrypt.compare(password,user.password); //& comparing the password

        if(!isMatch){
            return res.status(400).json({
                message:"Invalid credentials",
                success:false,
            })
        }

        if(role !== user.role){
            return res.status(400).json({
                message:"Invalid credentials",
                success:false,
            })
        }
    }
     catch(err){
         
     }
}