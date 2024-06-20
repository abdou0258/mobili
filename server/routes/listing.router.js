import express from 'express'
import {createListing,deleteListing,updateListing,getListing,getListings, favouriteListings,addFavouriteListing,removeFavouriteListing} from '../controllers/listing.controller.js'
import { verifyToken } from '../utils/verifyUser.js'
const router = express.Router()

router.post('/create',verifyToken, createListing)
router.delete('/delete/:id',verifyToken, deleteListing)
router.patch('/update/:id',verifyToken, updateListing)
router.get('/get/:id', getListing)
router.get('/get', getListings)
router.get('/favourites/:id', favouriteListings);
router.post('/favourites', addFavouriteListing);
router.delete('/favourites', removeFavouriteListing);


export default router