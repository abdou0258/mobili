import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import ListingItem from '../components/ListingItem';

export default function FavouriteListing() {
  const { currentUser } = useSelector((state) => state.user);
  const [favListings, setFavListings] = useState([]);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const getFavListings = async () => {
      try {
        const res = await fetch(`/api/listing/favourites/${currentUser._id}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          return;
        }
        setFavListings(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser._id) {
      getFavListings();
    }
  }, [currentUser]);

  useEffect(() => {
    const getListingDetails = async () => {
      try {
        const listingDetails = await Promise.all(
          favListings.map(async (id) => {
            const res = await fetch(`/api/listing/get/${id}`);
            const data = await res.json();
            return data;
          })
        );
        setListings(listingDetails);
      } catch (error) {
        console.log(error.message);
      }
    };

    if (favListings.length > 0) {
      getListingDetails();
    }
  }, [favListings]);

  const handleRemove = (listingId) => {
    setListings((prevListings) => prevListings.filter((listing) => listing._id !== listingId));
    setFavListings((prevFavListings) => prevFavListings.filter((id) => id !== listingId));
  };

  return (
    <div>
      <div className="bg-all">
        <Header />
        <h1 className="text-white text-center mt-14 font-bold">Favourite Listings</h1>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-4 m-5">
        {listings.map((listing) => (
          <ListingItem key={listing._id} listing={listing} onRemove={handleRemove} />
        ))}
      </div>
    </div>
  );
}
