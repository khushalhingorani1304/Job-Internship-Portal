import express from 'express';
import {registerCompany, getCompany, getCompanyById, updateCompany} from '../controllers/companyController.js';
import isAuthenticated from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/registerCompany',isAuthenticated,registerCompany); //& isAuthenticated middleware is used to check if the user is logged in or not
router.get('/getCompany',isAuthenticated,getCompany); //& isAuthenticated middleware is used to check if the user is logged in or not
router.get('/getCompany/:id',isAuthenticated,getCompanyById); //& isAuthenticated middleware is used to check if the user is logged in or not
router.put('/updateCompany/:id',isAuthenticated,updateCompany); //& isAuthenticated middleware is used to check if the user is logged in or not

export default router;