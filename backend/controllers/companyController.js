import {Company} from '../models/companyModel.js';

export const registerCompany = async (req,res) =>{
    try{
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({
                message:"Company Name is required",
                success:false,
            });
        }
        
        let company = await Company.findOne({companyName}); //& checking if the company already exists
        if(company){ 
            return res.status(400).json({
                message:"Company already exists",
                success:false,
            })
        }

        company = await Company.create({
            name:companyName,
            userId:req.id,
        })

        return res.status(201).json({
            message:`Company registered successfully.`,
            company,
            success:true,
        })

    }catch(err){
        console.log(err.message);
    }
}


export const getCompany = async (req,res) =>{
    try {
        const userId = req.id; //& Ye isliye kiya ki jis user ne logged in kar rakha hai sirf usi ki created companies mille and overall database mai jitni companies hain un sab ki nahi milegi 
        const companies = await Company.find({userId}); //& finding the companies by userId
        if(!companies){
            return res.status(404).json({
                message:"No companies found",
                success:false,
            })
        }

        return res.status(200).json({
            message:"Companies fetched successfully",
            companies,
            success:true,
        })

    } catch (error) {
        log.error(error.message);
    }
}


export const getCompanyById = async (req,res) =>{
    try {
        const {id} = req.params; //& destructuring the data from the request body
        let company = await Company.findById(id); //& finding the company by id
        if(!company){
            return res.status(404).json({
                message:"Company not found",
                success:false,
            })
        }

        return res.status(200).json({
            message:"Company fetched successfully",
            company,
            success:true,
        })

    } catch (error) {
        log.error(error.message);
    }
}

export const updateCompany = async (req,res) =>{
    try {
        const {id} = req.params; //& destructuring the data from the request body
        const {name, description, website, location} = req.body; //& destructuring the data from the request body
        const file  = req.file; //& getting the files from the request body
        //* Cloudinary Setup HERE


        let updateData = {name,description,website,location}; //& creating an object to update the data
        let company = await Company.findByIdAndUpdate(id,updateData,{new:true}); //& finding the company by id and updating it

        if(!company){
            return res.status(404).json({
                message:"Company not found",
                success:false,
            })
        }

        return res.status(200).json({
            message:"Company updated successfully",
            company,
            success:true,
        })

    } catch (error) {
        log.error(error.message);
    }
}