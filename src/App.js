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
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import { useAuth } from "./providers/auth";
import Rides from "./Pages/Ride/Rides";
import BookRide from "./Booking/BookRide";
import BookingReq from "./Booking/BookinReq";
const App = () => {
  const auth = useAuth()
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <BrowserRouter>
        <Header />

        {/* <VerticalNav /> */}
        <div className=" mx-auto w-screen">
          <Routes>

            <Route
              path="login"
              element={
                auth.user._id ? (
                  <Navigate replace to="/" />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="register"
              element={
                auth.user._id ? (
                  <Navigate replace to="/profile" />
                ) : (
                  <Register />
                )
              }
            />

            <Route
              path="profile/:id?"
              element={
                auth.user._id ? <Profile /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="booking"
              element={
                auth.user._id ? <Booking /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="postride"
              element={
                auth.user._id && auth.user.role !== 'admin'
                  ? <PostRide />
                  : <Navigate replace to="/login" />
              }
            />
            <Route
              path="rides"
              element={
                auth.user._id ? <Rides /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="postvehicle"
              element={
                auth.user._id && auth.user.role !== 'admin'
                  ? <AddVehicle />

                  : <Navigate replace to="/login" />
              }
            />
            <Route
              path="vehicles"
              element={
                auth.user._id ? <Vehicles /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="bookingreq"
              element={
                auth.user._id ? <BookingReq /> : <Navigate replace to="/login" />
              }
            />




            <Route
              path="bookingreq/:id"
              element={
                auth.user._id ? <BookingReq /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="/postride/:id?"
              element={
                auth.user._id ? <PostRide /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="/postvehicle/:id?"
              element={
                auth.user._id ? <AddVehicle /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="customer"
              element={
                auth.user._id && auth.user.role === 'admin' ?
                  <Customer />
                  :
                  <Navigate replace to="/login" />
              }
            />

            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/details" element={<Details />} />
            <Route path="/SearchRide" element={<SearchRide />} />
            <Route path="/SearchRide/:pickup?/:desti?/:start?/:end?" element={<SearchRide />} />
            <Route path="/bookride/:id" element={<BookRide />} />


            {/* <Route path="/booking" element={<Booking />} /> */}
            {/* <Route path="/rides" element={<Rides />} /> */}
            {/* <Route path="/vehicles" element={<Vehicles />} /> */}

            {/* <Route path="/bookingreq/:id" element={<BookingReq />} /> */}
            {/* <Route path="/postride/:id?" element={<PostRide />} /> */}
            {/* <Route path="/postvehicle/:id?" element={<AddVehicle />} /> */}




            {/* <Route path="/customer" element={<Customer />} /> */}
            {/* <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} /> */}
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
