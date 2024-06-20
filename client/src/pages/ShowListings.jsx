import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


export default function ShowListings() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [showListingsError, setShowListingsError] = useState(false);
  const [listings, setListings] = useState([]);
  
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setShowListingsError(false);
        const res = await fetch(`/api/user/listings/${currentUser._id}`);
        const data = await res.json();
        if (data.success === false) {
          setShowListingsError(true);
          return;
        }
        setListings(data);
      } catch (error) {
        setShowListingsError(true);
      }
    };

    if (currentUser) {
      fetchListings();
    }
  }, [currentUser]);

  const handleDelete=async(listingId)=>{
     try {
      const res = await fetch(`/api/listing/delete/${listingId}`,
        {
          method:"DELETE",
        }
      )
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setListings(prev=> prev.filter((listing) => listing._id !== listingId));
      
      
     } catch (error) {
      console.log(error);
     }
  }
  return (
    <div>
      <div className="bg-all">
        <Header />
        <h1 className="text-white text-center mt-14 font-bold">My Listings</h1>
      </div>
      <div className="flex flex-wrap justify-center">
        {listings &&
          listings.length > 0 ?
          listings.map((listing) => (
            <div key={listing._id}>
              <div className="max-w-sm m-5 bg-white border border-gray-200 rounded-lg shadow">
                <Link to={`/listing/${listing._id}`}>
                  <img 
                    className="rounded-t-lg  w-full h-52"
                    src={listing.imageUrls[0]}
                    alt=""
                  />
                </Link>
                <div className="p-5 bg-gray-100">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 truncate">
                    {listing.name}
                  </h5>
                  <p className="mb-3 text-sm font-normal text-gray-700 truncate">
                    {listing.description}
                  </p>
                  <div className="flex justify-between mt-6">
                    <Link
                      to={`/update-listing/${listing._id}`}
                      className="inline-flex items-center px-4 py-2 text-lg font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Edit
                      <FaEdit className="ms-2 text-md" />
                    </Link>
                    <button
                      onClick={()=> handleDelete(listing._id)}
                      className="inline-flex items-center px-4 py-2 text-lg font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                      Delete
                      <MdDelete className="ms-2 text-md" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )):<h4 className="text-black mt-10 ">You have No Listings</h4>}
      </div>
    </div>
  );
}
