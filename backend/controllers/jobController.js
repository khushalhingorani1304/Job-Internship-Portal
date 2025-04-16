import {Job} from "../models/jobModel.js"; //& importing the job model

export const postJob = async (req,res)=>{
    try {
        const {title,description,requirements,salary,location,jobType,experience,position,companyId} = req.body; //& destructuring the data from the request body
        const uderId = req.id; //& getting the user id from the request body

        if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId){
            return res.status(400).json({
                message:"Please fill all the fields",
                success:false,
            })
        }

        const job = await Job.create({
            title,
            description,
            requirements,
            salary: Number(salary),
            location,
            jobType,
            experience,
            position,
            company:companyId,
            created_by:uderId
        }) //& creating the job

        return res.status(201).json({
            message:"Job created successfully",
            job,
            success:true,
        })

    } catch (error) {
        log.error(error.message);
    }
}


export const getAllJobs = async (req,res) =>{
    try {
        const keyword = req.query.keyword || "";  //& Get keyword from query parameter

        const query = {  //& This code allows searching data where either the title or description contains the keyword  
            $or:[     //&   → $or means either title OR description should match the keyword.
                {title:{$regex:keyword, $options:"i"}}, //&   → $regex is used for pattern matching (like search).
                {description:{$regex:keyword, $options:"i"}} //&  → $options: "i" makes the search case-insensitive (so Job or job both match).
            ]
        }

        const jobs = await Job.findOne(query);

        if(!jobs){
            return res.status(404).json({
                message:"Jobs not found.",
                success:false
            })
        }

        return res.status(200).json({
            jobs,
            success:true
        })

    } catch (error) {
        log.error(error.message);
    }
}


export const getJobById = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);

        if(!job){
            return res.status(404).json({
                message:"Jobs not found.",
                success:false
            })
        }

        
        return res.status(200).json({
            jobs,
            success:true
        })

    } catch (error) {
        console.log(error.message);
    }
}

//? Admin kitne job create kara hai abhi tak
export const getAdminJobs = async (req,res) =>{
    try {
        const adminId = req.id;
        const jobs = await Job.find({created_by : adminId})

        if(!jobs){
            return res.status(404).json({
                message:"No Jobs Created By Admin",
                success:false
            })
        }

        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error.message);
    }
}