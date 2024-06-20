import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import CreateListing from "./pages/CreateListing";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import ShowListings from "./pages/ShowListings";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";
import FavouriteListings from "./pages/FavouriteListings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route path="/search" element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/fav-listings/:userId" element={<FavouriteListings />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/my-listings" element={<ShowListings />} />
          <Route path="/update-listing/:listingId" element={<UpdateListing />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
