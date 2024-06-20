import mongoose from 'mongoose'



const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(()=>{
    console.log("connected to db");
  }).catch((err)=>{
    console.log(err);
  })

}

export default connectDB