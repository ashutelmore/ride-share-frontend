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
import { useEffect, useState } from 'react'
import { getVehicles } from '../../App/VehicleApi'
import { bufferToImage } from '../../Helper/helper'
import { getRides, searchRides } from '../../App/RideApi'
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


  const [rides, setRides] = useState([])

  const [search, setSearch] = useState({
    pickup: '',
    desti: '',
    startDate: '',
    endDate: '',

    type: 'ride'
  })

  useEffect(() => {
    const fetchData = async (e) => {
      const res = await searchRides({
        type: 'vehicle',
        limit: 3
      })
      console.log('res', res)
      if (res.error) {
        // setLoader({ ...loader, vehicle: false })

      } else if (res.payload) {
        setRides(res.payload)
        // setLoader({ ...loader, vehicle: false })
      }
    };
    fetchData()
  }, [])
  console.log('rides', rides)

  return (
    <>
      <div className="main-container">
        <div className="background-text">
          <h2>book a <span>Ride now</span></h2>
        </div>

      </div>


      <section className="page-section" id="Book Ride"></section>
      <div className="home-container">
        <div className="home-content ">
          <div className="inner-content w-1/2">
            <h3>best in city</h3>
            <h2>We here for you</h2>
            <p></p>
            <Link to={"/SearchRide"} className="booknow">book now</Link>
          </div>
          <div className="inner-content w-1/2">
            <div className="contact-form">
              <div className="form-heading">
                <h1>find a ride</h1>
              </div>
              <div className="form-fields">
                <input
                  type="text"
                  placeholder="Pickup"
                  value={search.pickup}
                  onChange={(e) => setSearch({ ...search, pickup: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Destination"
                  value={search.desti}
                  onChange={(e) => setSearch({ ...search, desti: e.target.value })}
                />
                <input
                  type="date"
                  placeholder="start"
                  value={search.startDate}
                  onChange={(e) => setSearch({ ...search, startDate: e.target.value })}
                />
                <input
                  type="date"
                  placeholder="end"
                  value={search.endDate}
                  onChange={(e) => setSearch({ ...search, endDate: e.target.value })}
                />
              </div>
              <div className="submit">
                <Link to={"/SearchRide/" + search.pickup + '/' + search.desti + '/' + search.startDate + '/' + search.endDate}>Find Ride</Link>
              </div>

            </div>

          </div>
        </div>
      </div>

      <section className="page-section" id="Our Services"></section>
      <section className="services">
        <h2>Our Services</h2>
        <div className="services-container">
          <div className="service">
            <h3>Ride Sharing</h3>
            <p>Get matched with other riders heading in the same direction and split the cost of the trip.</p>
          </div>
          <div className="service">
            <h3>Car Pooling</h3>
            <p>Share a ride with other passengers and reduce traffic congestion and your carbon footprint.</p>
          </div>
          <div className="service">
            <h3>On-Demand Rides</h3>
            <p>Hail a ride instantly and get picked up by a nearby driver at any time of day or night.</p>
          </div>
        </div>
      </section>

      <section className="page-section" id="Vehical">
        <div className="main-tariff">
          <h1 className="section-heading text-uppercase">Vehical</h1>
          <div className="inner-tarrif flex justify-center items-center">

            {
              rides.length > 0
              &&
              rides.map((item, i) =>

                <div className="tarrif-container" key={i}>
                  <div className="inner-box flex flex-col items-center">
                    <img src={item.vehicleId && bufferToImage(item.vehicleId)} alt="" />
                    <h2>{item.vehicleId.vehicleName}</h2>
                    <h3>price: {item.pricePerKM}  /-</h3>
                    <Link
                      to={'/bookride/' + item._id}
                    >Book now</Link>
                  </div>

                </div>

              )
            }

            {/* <div className="tarrif-container">
              <div className="inner-box flex flex-col items-center">
                <img src={bike} alt="" />
                <h2 className="heading-yellow">Better</h2>

                <h3 className="yellw-section">price:  /-</h3>
                <a href="#" className="btn-yellow">Book now</a>
              </div>
            </div>

            <div className="tarrif-container">
              <div className="inner-box flex flex-col items-center">
                <img src={moped} alt="" />
                <h2>Best</h2>

                <h3>price:  /-</h3>
                <a href="#">Book now</a>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      <div className="fast-booking">
        <h1 className="fast-hading">we are best in the city </h1>
        <h2>Find your Ride and Enjoy</h2>
        <div className="inner-fast">
          <div className="booking-content">
          </div>
        </div>
      </div>




      <div className="testimonials">
        <h1 className="heading-test">happy clients</h1>
        <div className=" lg:flex">
          <div className="inner-test m-3">
            <h1>IronMan</h1>
            <p></p>
            <div className="clients">
              <img src={tony} alt="" />
              <p>As Iron Man, I've experienced some pretty epic modes of transportation, but even I have to admit, there's something special about a good cab ride. With a skilled driver at the wheel, a cab ride can </p>
            </div>
          </div>
          <div className="inner-test m-3">
            <h1>spiderMan</h1>
            <p></p>
            <div className="clients">
              <img src={spidy} alt="" />
              <p>As Spiderman, swinging through the city is my usual mode of transportation. But sometimes, even I need to take a break from my superhero duties and get around like a regular person. That's </p>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}
