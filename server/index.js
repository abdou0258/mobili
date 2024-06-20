import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import listingRouter from './routes/listing.router.js'
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();


const app = express();
app.use(express.json())
app.use(cookieParser())
const port = process.env.PORT || 5000;

const __dirname = path.resolve();
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/listing',listingRouter)

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || 'internal server error'
  return res.status(statusCode).json({
    success:false,
    statusCode,
    message
  })
})

const start = async () => {
  try {
    
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error.message);
  }
};

start();
