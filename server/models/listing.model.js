import mongoose from 'mongoose'
const listingSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please add a name'],
        unique:true
    },
    description:{
        type:String,
        required:[true,'Please add a description'],
        
    },
    address:{
        type:String,
        required:[true,'Please add a address'],
        
    },
    regularPrice:{
        type:Number,
        required:[true,'Please add a price'],
    },
    surface:{
        type:Number,
        required:[true,'Please add a surface'],
    },
    discountPrice:{
        type:Number,
    },
    contactForPrice:{
        type:Boolean,
        required:true,
    },
    bedrooms:{
        type:Number,
        required:[true,'Please add a number of bedrooms'],
    },
    bathrooms:{
        type:Number,
        required:[true,'Please add a number of bathrooms'],
    },
    furnished:{
        type:Boolean,
        required:true,
    },
    parking:{
        type:Boolean,
        required:true,
    },
    offer:{
        type:Boolean,
        required:true,
    },
    type:{
        type:String,
        required:[true,'Please add a type'],
        
    },
    parking:{
        type:Boolean,
        required:true,
    },
    imageUrls:{
        type:Array,
        required:true,
    },
    userRef:{
        type:String,
        required:true,
    },
},{timestamps:true}
)






const Listing = mongoose.model('Listing',listingSchema)
export default Listing