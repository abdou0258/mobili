import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import {
    FaBath,
    FaBed,
    FaRulerCombined,
  } from "react-icons/fa";


export default function ListingCard({ listing }) {
  

  return (
    <div className="bg-prim shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
          }
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
      </Link>
      <p className="text-white mt-4 font-semibold ps-3 ">
          $
          {listing.offer
            ? listing.discountPrice.toLocaleString("en-US")
            : listing.regularPrice.toLocaleString("en-US")}
          {listing.type === "rent" && " / month"}
        </p>
      <div className="p-3 flex flex-col gap-2 w-full">
        <div className="flex items-center gap-1">
          <MdLocationOn className="h-4 w-4 text-gray-300" />
          <p className="text-sm text-gray-300 truncate w-full">
            {listing.address}
          </p>
        </div>
        <p
          className="text-sm text-gray-300 line-clamp-2 "
          style={{ wordWrap: "break-word", wordBreak: "break-all" }}
        >
          {listing.description}
        </p>
         <div className="w-full h-px bg-gray-300 my-2"></div>
        <div className="text-gray-300 flex justify-between items-center gap-4">
          <div className="flex gap-4">
            <div className="font-bold text-sm flex itmes-center ">
              <FaRulerCombined className="me-1 mt-px"/> 
              <span>{listing.surface} m²</span>
            </div>
            <div className="font-bold text-sm flex itmes-center">
            <FaBed className="me-1 mt-px"/> 
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed `}
            </div>
            <div className="font-bold text-sm flex itmes-center">
            <FaBath className="me-1 mt-px"/> 
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms} bath `}
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
}
