import express from 'express';
import { register,login,updateProfile,logout } from '../controllers/userController.js';
import isAuthenticated  from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/logout',logout);
router.post('/profile/update',isAuthenticated,updateProfile);


export default router;