import {User} from "../models/userModel.js";
import bcrypt from "bcryptjs"; //& for hashing the password
import jwt from "jsonwebtoken";

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

        const user = await User.findOne({email}); //& finding the user by email
        
        //& checking if the user already exists
        if(user){ 
            return res.status(400).json({
                message:"Email id already exists",
                success:false,
            })
        }

        const hashedPassword = await bcrypt.hash(password,10); //& hashing the password
     
        const newUser = await User.create({
            fullName,
            email,
            phoneNumber,
            password:hashedPassword,
            role,
        })

            return res.status(201).json({
                message:`Account created successfully.`,
                success:true
            })
         }
     catch(err){
        console.log(err.message);
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

        let user = await User.findOne({email}); 
        
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
        
        
        const tokenData = { 
            id:user._id
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY,{expiresIn:'1D'}); //& generating the token

        //& setting the token in the cookie
        //& sending the token in the response
        //& setting the cookie in the response
        
        user = {
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile,
        }

        return res.status(200).cookie("token",token,{maxAge:24*60*60*1000,httpOnly:true,sameSite:"strict"}).json({
            message :`Welcome back ${user.fullName}`,
            user,
            success:true
        })

    }
     catch(err){
        console.log(err.message);
                 
     }
}


export const logout = async(req,res) =>{
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged Out Successfully",
            success:true
        })
    }catch(err){
        console.log(err.message);
    }
}


export const updateProfile = async(req,res) =>{
    try{
        const {fullName, email, phoneNumber, bio, skills} = req.body;
        const files = req.files; //& getting the files from the request


        if(!fullName || !email || !phoneNumber, !bio, !skills){
            return res.status(400).json({
                message:"All fields are required",
                success:false,
            });
        }

        //* Cloudinary Setup HERE

        const skillsArray = skills.split(",");
        const userId = req.id; 
        let user = await User.findById(userId); //& finding the user by id

        if(!user){
            return res.status(400).json({
                message:"User not found",
                success:false,
            })
        }

        //& updating Data
        user.fullName = fullName;   
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.profile.bio = bio;
        user.profile.skills = skillsArray; 
        
        //* Resume Will Later Come here 

        await user.save(); //& saving the user


        user = {
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile,
        }

        return res.status(200).json({
            message:"Profile updated successfully",
            user,
            success:true
        })

    }catch(err){
        console.log(err.message);
    }
}


