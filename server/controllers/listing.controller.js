import Listing from '../models/listing.model.js'
import Favourite from '../models/favourite.model.js'
import { errorHandler } from '../utils/error.js'

export const createListing = async(req,res,next)=>{
    try {
       const listing = await Listing.create(req.body)
       return res.status(201).json(listing)
    } catch (error) {
        next(error)
    }
}

export const deleteListing = async(req,res,next)=>{
    try {
       const listing = await Listing.findById(req.params.id)
       if(!listing){
        return next(errorHandler(404,'Listing not found !'))
        }
        if(req.user.id !== listing.userRef){
            return next(errorHandler(403,'Unauthorized !'))
        }
        await Listing.findByIdAndDelete(req.params.id)
        return res.status(200).json('Listing deleted successfully !')
       
    } catch (error) {
        next(error)
    }
}


export const updateListing = async(req,res,next)=>{
    try {
       const listing = await Listing.findById(req.params.id)
       if(!listing){
        return next(errorHandler(404,'Listing not found !'))
        }
        if(req.user.id !== listing.userRef){
            return next(errorHandler(403,'Unauthorized !'))
        }
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )
        return res.status(200).json(updatedListing)
       
    } catch (error) {
        next(error)
    }
}
export const getListing = async(req,res,next)=>{
    try {
       const listing = await Listing.findById(req.params.id)
       if(!listing){
        return next(errorHandler(404,'Listing not found !'))
        }
        return res.status(200).json(listing)
       
    } catch (error) {
        next(error)
    }
}

export const getListings = async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;
      let offer = req.query.offer;
  
      if (offer === undefined || offer === 'false') {
        offer = { $in: [false, true] };
      }
  
      let furnished = req.query.furnished;
  
      if (furnished === undefined || furnished === 'false') {
        furnished = { $in: [false, true] };
      }
  
      let parking = req.query.parking;
  
      if (parking === undefined || parking === 'false') {
        parking = { $in: [false, true] };
      }
  
      let type = req.query.type;
  
      if (type === undefined || type === 'all') {
        type = { $in: ['sale', 'rent'] };
      }
  
      const searchTerm = req.query.searchTerm || '';
  
      const sort = req.query.sort || 'createdAt';
  
      const order = req.query.order || 'desc';
  
      const listings = await Listing.find({
        name: { $regex: searchTerm, $options: 'i' },
        offer,
        furnished,
        parking,
        type,
      })
        .sort({ [sort]: order })
        .limit(limit)
        .skip(startIndex);
  
      return res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  };

  export const favouriteListings= async(req, res, next)=>{
    try {
      const userId = req.params.id;
      const favourites = await Favourite.find({ userId }).populate('listingId');

      if (!favourites.length) {
          return next(errorHandler(404, 'No favourite listings found for this user.'));
      }
      
      const favouriteListings = favourites.map(fav => fav.listingId);

      return res.status(200).json(favouriteListings);
  } catch (error) {
      next(error);
  }
  }

  export const addFavouriteListing = async (req, res, next) => {
    try {
        const { userId, listingId } = req.body;
        if (!userId || !listingId) {
          return next(errorHandler(400, 'User ID and Listing ID are required.'));
      }
        // Check if the favourite already exists
        const existingFavourite = await Favourite.findOne({ userId, listingId });
        if (existingFavourite) {
            return next(errorHandler(400, 'Listing already in favourites.'));
        }

        // Create a new favourite
        const favourite = await Favourite.create({ userId, listingId });
        return res.status(201).json(favourite);
    } catch (error) {
        next(error);
    }
};

export const removeFavouriteListing = async (req, res, next) => {
  try {
      const { userId, listingId } = req.body;

      // Find and delete the favourite
      const favourite = await Favourite.findOneAndDelete({ userId, listingId });
      if (!favourite) {
          return next(errorHandler(404, 'Favourite listing not found.'));
      }

      return res.status(200).json('Favourite listing removed successfully.');
  } catch (error) {
      next(error);
  }
};
