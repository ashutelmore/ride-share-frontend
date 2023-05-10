import React, { useState, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Profile from "./Pages/Profile/Profile";
import About from "./Pages/About/About";
import NotFound from "./Pages/NotFound";
import Details from "./Pages/Profile/Details";
import MyBooking from "./Booking/Booking";
import Booking from "./Booking/Booking";
import SearchRide from "./Pages/Ride/SearchRide";
import PostRide from "./Pages/Ride/PostRide";
import AddVehicle from "./Pages/Ride/AddVehicle";
import Vehicles from "./Pages/Ride/Vehicle";
import Customer from "./Pages/Customer/Customer";
const App = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <BrowserRouter>
        <Header />

        {/* <VerticalNav /> */}
        <div class="max-w-5xl mx-auto w-screen">
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/details" element={<Details />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/SearchRide" element={<SearchRide />} />
            <Route path="/postride" element={<PostRide />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/postvehicle" element={<AddVehicle />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="*" element={<NotFound />} />

            {/* <Route
              path="login"
              element={
                auth.user._id ? (
                  <Navigate replace to="/profile" />
                ) : (
                  <LoginForm />
                )
              }
            /> */}
            {/* <Route
              path="register"
              element={
                auth.user._id ? (
                  <Navigate replace to="/profile" />
                ) : (
                  <Register />
                )
              }
            /> */}
            {/* <Route path="/register" element={<Register />} /> */}
            {/* <Route path="/login" element={<LoginForm />} /> */}

          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
