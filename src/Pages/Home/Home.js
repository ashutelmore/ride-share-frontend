import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import Testimonials from './Testimonials'
import Mumbai from './../../assets/Mumbai.png'
import bike from './../../assets/bike1.png'
import car1 from './../../assets/car1.png'
import logogg from './../../assets/logogg.png'
import moped from './../../assets/moped.1.png'
import bg from './../../assets/bg.jpg'
import tony from './../../Pages/Home/images/tonystark.png'
import spidy from './../../Pages/Home/images/spidy.png'

import { Link } from 'react-router-dom'
import './style.css'
const features = [
  {
    name: 'Ride Sharing',
    description:
      'Get Matched With Other Riders Heading In The Same Direction And Split The Cost Of The Trip.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Car Pooling',
    description:
      'Share A Ride With Other Passengers And Reduce Traffic Congestion And Your Carbon Footprint.',
    icon: LockClosedIcon,
  },
  {
    name: 'On-Demand Rides',
    description:
      'Hail A Ride Instantly And Get Picked Up By A Nearby Driver At Any Time Of Day Or Night.',
    icon: ArrowPathIcon,
  }
]

export default function Home() {
  return (
    <>
      <div class="main-container">
        <div class="background-text">
          <h2>book a <span>Ride now</span></h2>
        </div>

      </div>


      <section class="page-section" id="Book Ride"></section>
      <div class="home-container">
        <div class="home-content ">
          <div class="inner-content w-1/2">
            <h3>best in city</h3>
            <h2>We here for you</h2>
            <p></p>
            <a href="./Ride_Booking/Booking.html" class="booknow">book now</a>
          </div>
          <div class="inner-content w-1/2">
            <div class="contact-form">
              <div class="form-heading">
                <h1>find a ride</h1>
              </div>
              <div class="form-fields">
                <input type="text" placeholder="name" />
                <input type="tel" placeholder="phone No." />
                <input type="text" placeholder="Date" />
                <input type="text" placeholder="Destination" />
                <input type="text" placeholder="start" />
                <input type="text" placeholder="end" />
              </div>
              <div class="submit">
                <a href="./Ride_Booking/Booking.html">Find Ride</a>
              </div>

            </div>

          </div>
        </div>
      </div>

      <section class="page-section" id="Our Services"></section>
      <section class="services">
        <h2>Our Services</h2>
        <div class="services-container">
          <div class="service">
            <h3>Ride Sharing</h3>
            <p>Get matched with other riders heading in the same direction and split the cost of the trip.</p>
          </div>
          <div class="service">
            <h3>Car Pooling</h3>
            <p>Share a ride with other passengers and reduce traffic congestion and your carbon footprint.</p>
          </div>
          <div class="service">
            <h3>On-Demand Rides</h3>
            <p>Hail a ride instantly and get picked up by a nearby driver at any time of day or night.</p>
          </div>
        </div>
      </section>

      <section class="page-section" id="Vehical">
        <div class="main-tariff">
          <h1 class="section-heading text-uppercase">Vehical</h1>
          <div class="inner-tarrif flex justify-center items-center">
            <div class="tarrif-container">
              <div class="inner-box flex flex-col items-center">
                <img src={car1} alt="" />
                <h2>Good</h2>
                <h3>price:  /-</h3>
                <a href="#">Book now</a>
              </div>

            </div>

            <div class="tarrif-container">
              <div class="inner-box flex flex-col items-center">
                <img src={bike} alt="" />
                <h2 class="heading-yellow">Better</h2>

                <h3 class="yellw-section">price:  /-</h3>
                <a href="#" class="btn-yellow">Book now</a>
              </div>
            </div>

            <div class="tarrif-container">
              <div class="inner-box flex flex-col items-center">
                <img src={moped} alt="" />
                <h2>Best</h2>

                <h3>price:  /-</h3>
                <a href="#">Book now</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="fast-booking">
        <h1 class="fast-hading">we are best in the city </h1>
        <h2>Find your Ride and Enjoy</h2>
        <div class="inner-fast">
          <div class="booking-content">
          </div>
        </div>
      </div>




      <div class="testimonials">
        <h1 class="heading-test">happy clients</h1>
        <div class=" flex">
          <div class="inner-test m-3">
            <h1>IronMan</h1>
            <p></p>
            <div class="clients">
              <img src={tony} alt="" />
              <p>As Iron Man, I've experienced some pretty epic modes of transportation, but even I have to admit, there's something special about a good cab ride. With a skilled driver at the wheel, a cab ride can </p>
            </div>
          </div>
          <div class="inner-test m-3">
            <h1>spiderMan</h1>
            <p></p>
            <div class="clients">
              <img src={spidy} alt="" />
              <p>As Spiderman, swinging through the city is my usual mode of transportation. But sometimes, even I need to take a break from my superhero duties and get around like a regular person. That's </p>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}
