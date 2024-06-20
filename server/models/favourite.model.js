import mongoose from 'mongoose'
const favouriteSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    listingId: {
        type: String,
        required: true,
    }
    
},{timestamps:true}
)

favouriteSchema.index({ userId: 1, listingId: 1 }, { unique: true });

const fav = mongoose.model('Favourite',favouriteSchema)
export default fav