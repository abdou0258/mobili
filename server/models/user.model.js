import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please add a username'],
        unique:true
    },
    email:{
        type:String,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
        required:[true,'Please add a email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please add a password'],
        minlength:8
    },
    role:{
        type:String,
        required:[true,'Please add a role'],
        default: "Individual"
    },
    avatar:{
        type:String,
        default:"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
    },
},{timestamps:true}
)






const User = mongoose.model('User',userSchema)
export default User