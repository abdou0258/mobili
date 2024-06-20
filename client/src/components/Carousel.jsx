import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offerListings, setOfferListings] = useState([]);

  const totalVisible = 4; 

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? Math.max(0, offerListings.length - totalVisible) : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex >= offerListings.length - totalVisible;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=10");
        const data = await res.json();
        setOfferListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <>
      <div className="relative flex items-center justify-center w-full max-w-5xl mx-auto overflow-hidden">
       

        <FaChevronLeft
          className="absolute left-0 text-4xl bg-white rounded-full p-2 cursor-pointer text-gray-700 z-10"
          onClick={goToPrevious}
        />
        
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / totalVisible)}%)`, width: `${offerListings.length * 25}%` }}
          >
            {offerListings && offerListings.length > 0 && (
              offerListings.map((listing, index) => (
                <div className="w-96 p-2 box-border" key={index}>
                  <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-52  md:h-72 object-cover rounded-lg"
                  />
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
        <FaChevronRight
          className="absolute right-0 bg-white rounded-full p-2 text-4xl cursor-pointer text-gray-700 z-10"
          onClick={goToNext}
        />
      </div>
      <Link
        className="text-sm text-prim bg-white px-8 py-4 mt-10 mx-auto block w-1/2 md:w-40 text-center font-semibold"
        to={"/search?offer=true"}
      ><button>

        <p>See more</p> 
      </button>
      </Link>
    </>
  );
};

export default Carousel;
