import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/user/favoriteSlice";

export default function ListingItem({ listing, onRemove }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const isFavorite = useSelector((state) => state.favorites[listing._id]);

  const handleClick = async () => {
    const userId = currentUser._id;
    const listingId = listing._id;
    await dispatch(toggleFavorite({ userId, listingId }));
    if (isFavorite && onRemove) {
      onRemove(listingId);
    }
  };

  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
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
      <div className="p-3 flex flex-col gap-2 w-full">
        <p className="truncate text-lg font-semibold text-slate-700">
          {listing.name}
        </p>
        <div className="flex items-center gap-1">
          <MdLocationOn className="h-4 w-4 text-second" />
          <p className="text-sm text-gray-600 truncate w-full">
            {listing.address}
          </p>
        </div>
        <p
          className="text-sm text-gray-600 line-clamp-2 "
          style={{ wordWrap: "break-word", wordBreak: "break-all" }}
        >
          {listing.description}
        </p>
        <p className="text-accent mt-2 font-semibold ">
          $
          {listing.offer
            ? listing.discountPrice.toLocaleString("en-US")
            : listing.regularPrice.toLocaleString("en-US")}
          {listing.type === "rent" && " / month"}
        </p>
        <div className="text-slate-700 flex justify-between items-center gap-4">
          <div className="flex gap-4">
            <div className="font-bold text-xs">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed `}
            </div>
            <div className="font-bold text-xs">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms} bath `}
            </div>
            <div className="font-bold text-xs">
              {listing.surface} m²
            </div>
          </div>
          <button
            className="me-2 text-2xl border-2 rounded-full w-10 h-10 flex items-center justify-center"
            onClick={handleClick}
          >
            {isFavorite ? (
              <FaHeart className="text-red-700" />
            ) : (
              <FaHeart className="text-gray-200" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
