import express  from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin:"http://localhost:5173",
    credentials: true,
}
app.use(cors(corsOptions))



const PORT = 3000;
app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
})