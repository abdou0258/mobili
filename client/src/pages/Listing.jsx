import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
  FaRulerCombined,
} from "react-icons/fa";
import Contact from "../components/Contact";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const params = useParams();
  const [contact, setContact] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchListing();
  }, []);

  

  return (
    <div>
      <div className="bg-all">
        <Header />
      </div>
      {loading && <p className="text-center mt-10 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center mt-10 text-2xl text-red-700">
          Something went wrong, please try again later.
        </p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-5xl mx-auto p-3 my-7 gap-4">
            <h3 className=" font-semibold">
              {listing ? (
                <>
                  {listing.name} - {" "}
                  {listing.contactForPrice ? (
                    " Contact for pricing"
                  ) : (
                    <>
                      ${listing.offer
                        ? listing.discountPrice?.toLocaleString("en-US")
                        : listing.regularPrice?.toLocaleString("en-US")}
                      {listing.type === "rent" && " / month"}
                    </>
                  )}
                </>
              ) : (
                "Listing not available"
              )}
            </h3>
            <h5 className="flex items-center mt-6 gap-2 text-slate-600  ">
              <FaMapMarkerAlt className="text-accent" />
              {listing.address}
            </h5>
            <div className="flex gap-4">
              <p className="bg-second w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-prim w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>
            <p className="text-slate-800  py-5 border-y-2 " style={{ wordWrap: 'break-word',
  wordBreak: 'break-all',}}>
              {listing.description}
            </p>
            <ul className="text-prim font-semibold text-sm flex flex-wrap my-5 items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaRulerCombined className="text-lg" />
                {listing.surface} m²
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-prim text-white rounded-lg uppercase hover:opacity-95 p-3"
              >
               <p>Contact landlord</p> 
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </div>
  );
}
