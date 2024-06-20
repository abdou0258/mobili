import React from "react";
import Header from "../components/Header";
import img1 from "../assets/hero-img-1.jpeg";
import img2 from "../assets/hero-img-2.jpg";
import img3 from "../assets/hero-img-3.jpg";
import img4 from "../assets/hero-img-4.jpg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingCard from "../components/ListingCard";
import Carousel from "../components/Carousel";
import slack from "../assets/slack.png";
import linkedin from "../assets/in.png";
import walmart from "../assets/walmart.png";

function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [subject,setSubject] = useState('')
  const [message,setMessage] = useState('')

  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'subject':
        setSubject(value);
        break;
      case 'message':
        setMessage(value);
        break;
      default:
        break;
    }
  };
  
  
  SwiperCore.use([Navigation]);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <>
      <section className="hero">
        <Header />
        <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-52   md:mt-40">
          <div className="pt-28">
            <h1 className="text-white ps-4 md:ps-20 mb-6 capitalize	">
              The world <br />
              of luxury
            </h1>
            <p className="text-white ps-4 md:ps-20 text-nowrap capitalize	">
              unlock the perfect living experience <br /> exploring diverse
              selection of homes
            </p>
          </div>
          <div className=" flex  gap-4 px-4">
            <img src={img1} alt="" className="rounded-xl w-40 md:w-80  " />
            <img src={img2} alt="" className="rounded-xl w-40 md:w-80 " />
            <img src={img3} alt="" className="rounded-xl w-40 md:w-80 " />
            <img src={img4} alt="" className="rounded-xl w-40 md:w-80 " />
          </div>
        </div>
      </section>
      <div className="py-32 bg-second px-5">
        <h2 className="text-center mb-5 text-white">Discover Homes</h2>
        <h5 className="text-center mb-14 text-white">
          Embark on a journey of dsicovery through our extensive collection{" "}
          <br /> of homes, perfectly curated for you.
        </h5>
        <Carousel />
      </div>
      <div className="flex flex-col md:flex-row justify-around py-32 bg-prim px-5">
        <div>
          <h2 className=" mb-5 text-white capitalize">
            Trsuted by 100+ <br />
            top companies
          </h2>
          <h5 className=" mb-14 text-white capitalize">
            our expertie and reliability have positioned us as a <br />
            cornerstone in the industry, fostering strong partnerships <br />{" "}
            and delievring unparaleled service.
          </h5>
          <Link
            className="text-sm text-prim bg-white px-8 py-4 mt-10  block w-1/2 md:w-40  font-semibold"
            to={"/search?"}
          >
            <button>
              <p className="text-nowrap">Explore now</p>
            </button>
          </Link>
        </div>

        <div className="md:mt-10 flex flex-col items-center mt-20">
          <div className="flex gap-32 capitalize">
            <img
              src="https://www.edigitalagency.com.au/wp-content/uploads/PayPal-logo-white-png-vertical.png"
              className="w-20"
            />
            <img src={slack} alt="" className="w-20" />
          </div>
          <div className="flex gap-32 capitalize md:mt-20 mt-24">
            <img src={linkedin} alt="" className="w-20" />
            <img src={walmart} alt="" className="w-20" />
          </div>
        </div>
      </div>

      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer, sale and rent */}

      <div className="bg-second">
        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-20 ">
          <h2 className="capitalize text-white mt-16">
            Elevate your living <br />
            Experience Today.
          </h2>
          <div className="w-11/12 h-px bg-gray-500 my-2"></div>
          {rentListings && rentListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-white my-5">
                  For Rent
                </h2>
              </div>
              <div className="flex flex-wrap gap-4">
                {rentListings.map((listing) => (
                  <ListingCard listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
          <Link to={"/search?type=rent"}>
            <button
              type="button"
              class="px-8 py-3.5 text-base font-medium text-black bg-white hover:bg-white block mx-auto mt-4"
            >
              See more
            </button>
          </Link>

          {saleListings && saleListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-white my-5">
                  For Sale
                </h2>
              </div>
              <div className="flex flex-wrap gap-4">
                {saleListings.map((listing) => (
                  <ListingCard listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
          <Link to={"/search?type=sale"}>
            <button
              type="button"
              class="px-8 py-3.5 text-base font-medium text-black bg-white hover:bg-white block mx-auto mt-4"
            >
              See more
            </button>
          </Link>
        </div>
      </div>
      <section className="contact  ">
        <div className="w-4/5 mx-auto">
          <div className="flex  text-white justify-center lg:gap-32 mt-20">
            <div className=" text-center">
              <span className="text-3xl md:text-6xl lg:text-8xl border-r md:px-10 px-8 font-semibold mb-5">
                840+
              </span>
              <p className="pt-6 text-xs md:text-base">Success house for sale</p>
            </div>
            <div className=" text-center">
              <span className="text-3xl  md:text-6xl lg:text-8xl border-r md:px-10 px-8 font-semibold mb-5">
                99%
              </span>
              <p className="pt-6 text-xs md:text-base">Satisfied & Happy Customers</p>
            </div>
            <div className=" text-center">
              <span className="text-3xl md:text-6xl lg:text-8xl  md:px-10 px-8 font-semibold mb-5">204+</span>
              <p className="pt-6 text-xs md:text-base">Experienced Agents Have Joined</p>
            </div>
          </div>
          <h2 className="captilize text-white mt-40">
            Trusted By <br /> 25k+ people
          </h2>
          <Link to={"/search?type=sale"}>
            <button
              type="button"
              class="px-6 py-3 text-base font-medium text-black bg-white hover:bg-white mt-4"
            >
              Explore Now
            </button>
          </Link>
        </div>
      </section>
      <section className="bg-second relative pt-10">
        <div className="max-w-xl lg:max-w-3xl absolute -top-80  lg:bottom-10  lg:left-20 glass p-10 rounded-lg lg:mx-0 mx-auto ">
          <h3 className="text-white mb-5">Connect With Us !</h3>
          <p className="text-gray-200 mb-10">
            We Believe in Collaboration and value your input throughout the
            design process
          </p>
          <form action="">
            <div class="mb-6">
              <label
                for="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 0"
              />
            </div>
            <div class="mb-6">
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 0"
              />
            </div>
            <div class="mb-6">
              <label
                for="subject"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 0"
              />
            </div>
            <div class="mb-6">
              <label
                for="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Message
              </label>
              <textarea
                rows={5}
                id="message"
                value={message}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 0"
              />
            </div>
            <Link
          to={`mailto:abdouhdd16@gmail.com?subject=${subject}&body=${message}`}
          >
                
            <button
              type="button"
              class="px-6 py-3 text-base font-medium text-black bg-white hover:bg-white mt-4"
            >
              Send A Message
            </button>
          </Link>
          </form>
        </div>
        <div className="flex flex-col items-end sm:me-32 ps-4 md:pd-0 text-white md:pt-10 py-20 pt-96">
          <div>
            <h2 className="mt-10 ">Intrested In working with us ?</h2>
            <p className="text-gray-300">
              We ecourage our team to fearlessly challenge <br /> conventions
              and pioneer new paths
            </p>

            <div className="  mt-10">
              <div className="flex justify-start gap-10">
                <div>
                  <h4>Working mail</h4>
                  <p className="text-gray-300">contact@mobili.com</p>
                </div>
                <div>
                  <h4>Office phone</h4>
                  <p className="text-gray-300">+213 215 87 49 62</p>
                </div>
              </div>

              <h4 className="mt-5">Office adress</h4>
              <p  className="text-gray-300">didouche mourad, alger centre</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
