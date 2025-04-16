import express  from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './utils/db.js';
import userRouter from './routes/userRoute.js';
import companyRouter from './routes/comapnyRoutes.js';
import jobRouter from "./routes/jobRoutes.js"

const app = express();
dotenv.config({});




// Middleware
app.use(express.json());    //&It allows your Node.js server (Express) to accept JSON data from frontend (like React) in req.body
app.use(express.urlencoded({ extended: true }));  //&It allows your Node.js server (Express) to accept URL-encoded data from frontend (like React) in req.body () 
app.use(cookieParser()); //&It allows your Node.js server (Express) to parse cookies from incoming requests. This is useful for handling authentication and session management.
const corsOptions = {   
    origin:"http://localhost:5173", //&This is the URL of your frontend application (React) that will be making requests to your backend (Express).
    credentials: true,     
}
app.use(cors(corsOptions)) //&It allows your Node.js server (Express) to accept requests from the specified origin (http://localhost:5173) and include credentials (like cookies) in the requests.



// api's
app.use('/api/v1/user',userRouter); //&This is the route for user-related APIs. It uses the userRouter defined in userRoute.js.
app.use('/api/v1/company',companyRouter); //&This is the route for user-related APIs. It uses the userRouter defined in userRoute.js.
app.use('/api/v1/job',jobRouter); //&This is the route for user-related APIs. It uses the userRouter defined in userRoute.js.



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    connectDB(); //&This function connects your Node.js server (Express) to your MongoDB database using Mongoose.
  console.log(`Server is running on port ${PORT}`);
})