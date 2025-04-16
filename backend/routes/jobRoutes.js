import express from 'express'
import { postJob, getAllJobs, getJobById, getAdminJobs } from '../controllers/jobController.js'
import isAuthenticated from "../middlewares/authMiddleware.js"

const router = express.Router();

router.post("/postJob",isAuthenticated,postJob);
router.get("/getAllJobs",isAuthenticated,getAllJobs);
router.get("/getJobById/:id",isAuthenticated,getJobById);
router.get("/getAdminJobs",isAuthenticated,getAdminJobs);

export default router;