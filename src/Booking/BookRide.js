import React, { useEffect, useState } from 'react'
import { Buffer } from 'buffer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getRides } from '../App/RideApi';
import { useNotify } from '../Helper/Notify';
import { formatDateToShow, formatDateYMD, isEmptyField, isEmptyObject } from '../Helper/helper';
import { useAuth } from '../providers/auth';
import { createBookRide, createBookings, getBookings, updateBookings } from '../App/BookRideApi';
import NotFound from '../Pages/NotFound';
import { LoaderSmall } from '../Helper/Loader';

export default function BookRide({ }) {
    const params = useParams()
    const [ride, setRide] = useState([])
    const navigate = useNavigate()

    const [loader, setLoader] = useState({
        vehicle: false,
        ride: false,
        book: false
    })
    console.log('loader', loader)
    const auth = useAuth()
    const [bookRide, setBookRide] = useState({
        pickupLocation: '',
        destination: '',
        pickupDate: '',
        pickupTime: '',
        numSits: '',
        notes: 'something',
        isPrivateBooking: null
    })

    const [showNotification, contextHolder] = useNotify()

    const bufferToImage = (bufferData) => {
        return `data:${bufferData.image.contentType};base64, ${Buffer.from(bufferData.image.data.data).toString('base64')}`
    };

    //get ride data
    useEffect(() => {
        if (isEmptyObject(auth.user, ['profilePhoto']) && isEmptyObject(auth.user.address, [])) {
            window.alert("To book your ride you need to complete your profile first")
            navigate('/profile')
            return
        }

        const fetchData = async (id) => {
            setLoader({ ...loader, ride: true })
            const res = await getRides({ _id: id })
            console.log('res', res)
            if (res.error) {
                showNotification(res.error.errMessage)
                setLoader({ ...loader, ride: false })

            } else if (res.payload) {
                setLoader({ ...loader, ride: false })
                if (res.payload.length > 0)
                    setRide(res.payload[0])
                // showNotification(res.message)
            }
        };
        if (params.id)
            fetchData(params.id)
    }, [])

    //fetch previous booking data
    useEffect(() => {
        const fetchData = async (id) => {
            setLoader({ ...loader, book: true })
            let res
            if (auth.user.role === 'admin') {
                res = await getBookings({ rideId: id, passangerId: auth.user._id })
            } else {
                res = await getBookings({ rideId: id, passangerId: auth.user._id })
            }
            if (res.error) {
                showNotification(res.error.errMessage)
                setLoader({ ...loader, book: false })

            } else if (res.payload) {
                if (res.payload.length > 0)
                    setBookRide(res.payload[0])
                // showNotification(res.message)
                setLoader({ ...loader, book: false })
            }
        };
        if (params.id)
            fetchData(params.id)
    }, [])

    // console.log('bookRide', bookRide)
    // console.log('ride', ride)
    // console.log('params', params)

    function isDateInFuture(dateString) {
        var inputDate = new Date(dateString);
        var currentDate = new Date();

        return inputDate > currentDate;
    }
    const onHandleBookRequest = async (e) => {
        e.preventDefault()
        const emptObjList = isEmptyObject(bookRide, ['pickupLocation', 'destination'])
        // const isEmpty = isEmptyField(vehicle.polices.isLicense, vehicle.polices.isInsurance)
        setLoader({ ...loader, ride: true })
        if (emptObjList.length > 0) {
            showNotification("any Input filed should not empty")
            setLoader({ ...loader, ride: false })
            return
        }
        if (isDateInFuture(bookRide.pickupDate)) {
            showNotification("Date should not be past")
            setLoader({ ...loader, ride: false })
            return
        }
        if (bookRide._id) {
            onHandleBookRequestUpdate()
            return
        }

        let data = {
            ...bookRide,
            passangerId: auth.user._id,
            driverId: ride.driverId._id,
            vehicleId: ride.vehicleId._id,
            rideId: ride._id,
        }
        setLoader({ ...loader, ride: true })
        const res = await createBookings(data)
        console.log('res', res)
        if (res.error) {
            showNotification(res.error.errMessage)
            setLoader({ ...loader, ride: false })

        } else if (res.payload) {
            showNotification(res.message)
            setBookRide(res.payload)
            setLoader({ ...loader, ride: false })
        }
    };
    const onHandleBookRequestUpdate = async (e) => {
        let data = {
            ...bookRide,

        }
        setLoader({ ...loader, ride: true })
        const res = await updateBookings(data._id, data)
        console.log('res', res)
        if (res.error) {
            showNotification(res.error.errMessage)
            setLoader({ ...loader, ride: false })

        } else if (res.payload) {
            showNotification(res.message)
            setBookRide(res.payload)
            setLoader({ ...loader, ride: false })
        }
    };

    // const renderBtnOnbooking = (e) => {
    //     if (!auth.user._id) {
    //         return <Link
    //             to={'/login'}
    //             className="block rounded bg-blue-600 px-5 py-3 my-3 text-xs font-medium text-white hover:bg-blue-500"
    //         >
    //             Login
    //         </Link>
    //     } else if (!auth.user.isVerified) {
    //         return <Link
    //             to={'/VerifyEmail'}
    //             className="block rounded bg-blue-600 px-5 py-3 my-3 text-xs font-medium text-white hover:bg-blue-500"
    //         >
    //             Verify Email
    //         </Link>
    //     }
    // };

    // if (loader.ride) {
    //     if (!ride._id)
    //         return <LoaderSmall />
    //     return <NotFound
    //         heading="No longer exists"
    //         descp="This ride seems like deleted by driver"
    //     />
    // }
    console.log('loader', loader)
    return (
        <>
            {
                loader.ride ?
                    <LoaderSmall />
                    :
                    !ride._id ?
                        <NotFound
                            heading="No longer exists"
                            descp="This ride seems like deleted by driver"
                        />
                        :
                        <section>
                            {contextHolder}
                            <div className="relative mx-auto max-w-screen-xl px-4 py-8">
                                <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
                                        <img
                                            alt="Les Paul"
                                            src={ride.vehicleId && bufferToImage(ride.vehicleId)}
                                            className="aspect-square w-full rounded-xl object-cover"
                                        />
                                        <div className="mt-8 flex justify-between">
                                            <div className="max-w-[35ch] space-y-2">
                                                <h1 className="text-xl font-bold sm:text-2xl">
                                                    Vehicle Details
                                                </h1>

                                                <h3 className="text-md">Vehicle Name : {ride.vehicleId.vehicleName}</h3>
                                                <h3 className="text-md">Vehicle Type : {ride.vehicleId.type}</h3>
                                                <h3 className="text-md">Vehicle No : {ride.vehicleId.vehicleNumber}</h3>
                                            </div>
                                        </div>

                                        <fieldset>
                                            <legend className="mb-1 text-sm font-medium "> Permissions in Vehicle </legend>

                                            <div className="flex flex-wrap gap-1">
                                                <label htmlFor="color_tt" className="cursor-pointer">
                                                    {ride.isAllow.chat ?

                                                        <span
                                                            className="group inline-block rounded-full border px-3 py-1 text-xs font-medium bg-green-400 text-white"
                                                        >
                                                            Chat allowed
                                                        </span>
                                                        :
                                                        <span
                                                            className="group inline-block rounded-full border px-3 py-1 text-xs font-medium bg-green-400 text-white"
                                                        >
                                                            Chat not allowed
                                                        </span>
                                                    }
                                                </label>
                                                <label htmlFor="color_tt" className="cursor-pointer">
                                                    {ride.isAllow.food ?

                                                        <span
                                                            className="group inline-block rounded-full border px-3 py-1 text-xs font-medium bg-green-400 text-white"
                                                        >
                                                            food allowed
                                                        </span>
                                                        :
                                                        <span
                                                            className="group inline-block rounded-full border px-3 py-1 text-xs font-medium bg-red-400 text-white"
                                                        >
                                                            food not allowed
                                                        </span>
                                                    }
                                                </label>
                                                <label htmlFor="color_tt" className="cursor-pointer">
                                                    {ride.isAllow.music ?

                                                        <span
                                                            className="group inline-block rounded-full border px-3 py-1 text-xs font-medium bg-green-400 text-white"
                                                        >
                                                            music allowed
                                                        </span>
                                                        :
                                                        <span
                                                            className="group inline-block rounded-full border px-3 py-1 text-xs font-medium bg-red-400 text-white"
                                                        >
                                                            music not allowed
                                                        </span>
                                                    }
                                                </label>
                                                <label htmlFor="color_tt" className="cursor-pointer">
                                                    {ride.isAllow.smoke ?

                                                        <span
                                                            className="group inline-block rounded-full border px-3 py-1 text-xs font-medium bg-green-400 text-white"
                                                        >
                                                            smoke allowed
                                                        </span>
                                                        :
                                                        <span
                                                            className="group inline-block rounded-full border px-3 py-1 text-xs font-medium bg-red-400 text-white"
                                                        >
                                                            smoke not allowed
                                                        </span>
                                                    }
                                                </label>
                                                <label htmlFor="color_tt" className="cursor-pointer">
                                                    {ride.isAllow.ladies ?

                                                        <span
                                                            className="group inline-block rounded-full border px-3 py-1 text-xs font-medium bg-green-400 text-white"
                                                        >
                                                            ladies allowed
                                                        </span>
                                                        :
                                                        <span
                                                            className="group inline-block rounded-full border px-3 py-1 text-xs font-medium bg-red-400 text-white"
                                                        >
                                                            ladies not allowed
                                                        </span>
                                                    }
                                                </label>
                                            </div>
                                        </fieldset>

                                    </div>

                                    <div className="sticky top-0">

                                        <strong
                                            className="rounded-full border border-green-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-green-600"
                                        >
                                            Vehicle {ride.vehicleId.status} by EzyRides
                                        </strong>


                                        <div className="mt-8 flex justify-between">
                                            <div className="max-w-[35ch] space-y-2">
                                                {
                                                    ride.isAvailableForBook ?

                                                        <h1 className="text-xl font-bold sm:text-2xl">
                                                            Location : {ride.pickupLocation}
                                                        </h1>
                                                        :
                                                        <h1 className="text-xl font-bold sm:text-2xl">
                                                            {ride.pickupLocation} to {ride.destination}
                                                        </h1>
                                                }
                                                <h3 className="text-md"> <b>Driver Name : </b> {ride.driverId.name}</h3>
                                                <h3 className="text-md"><b>Gender : </b>{ride.driverId.gender}</h3>
                                                <h3 className="text-md"><b>Contact No. : </b>{ride.driverId.phoneNumber}</h3>
                                                <h3 className="text-md"><b>Email : </b>{ride.driverId.email}</h3>
                                                <h3 className="text-md"> <b>Address :</b> {ride.driverId.address.streetAdd},{ride.driverId.address.city},{ride.driverId.address.state},{ride.driverId.address.pin} </h3>


                                            </div>
                                            {
                                                ride.isAvailableForBook ?
                                                    <p className="text-lg font-bold">₹ {ride.price}/KM</p>
                                                    :
                                                    <p className="text-lg font-bold">₹ {ride.price}/seat</p>
                                            }
                                        </div>

                                        <div className="mt-4">
                                            <div className=" text-left">
                                                <h6>
                                                    {ride.vehicleId.descp}
                                                </h6>
                                                {
                                                    !ride.isAvailableForBook &&
                                                    <h6>
                                                        Journey start from {formatDateToShow(ride.startDate)} and end on {formatDateToShow(ride.endDate)}
                                                    </h6>
                                                }
                                            </div>

                                            {/* <button className="mt-2 text-sm font-medium underline">Read More</button> */}
                                        </div>

                                        {
                                            auth.user.role === 'admin'
                                                ?
                                                null
                                                :
                                                ride.driverId._id == auth.user._id
                                                    ?

                                                    <div className="mt-8 w-full gap-4">
                                                        <Link
                                                            to={'/bookingreq/' + ride._id}
                                                            className="block rounded bg-blue-600 px-5 py-3 my-3 text-xs font-medium text-white hover:bg-blue-500"
                                                        >
                                                            View all requests of this ride
                                                        </Link>
                                                    </div>
                                                    :
                                                    <form className="mt-8" onSubmit={onHandleBookRequest}>

                                                        <fieldset className="mt-4">

                                                            <div className="flex flex-wrap ">

                                                                <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                                                    {
                                                                        false &&
                                                                        <>
                                                                            <div className="sm:col-span-3">
                                                                                <label htmlFor="start-location" className="block text-sm font-medium leading-6 text-gray-900">
                                                                                    Start Location
                                                                                </label>
                                                                                <div className="mt-2">
                                                                                    <input
                                                                                        type="text"
                                                                                        name="start-location"
                                                                                        id="start-location"
                                                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                        value={bookRide.pickupLocation}
                                                                                        onChange={(e) => setBookRide({ ...bookRide, pickupLocation: e.target.value })}
                                                                                    />
                                                                                </div>
                                                                            </div>

                                                                            <div className="sm:col-span-3">
                                                                                <label htmlFor="end-loaction" className="block text-sm font-medium leading-6 text-gray-900">
                                                                                    End Location
                                                                                </label>
                                                                                <div className="mt-2">
                                                                                    <input
                                                                                        type="text"
                                                                                        name="end-loaction"
                                                                                        id="end-loaction"
                                                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                        value={bookRide.destination}
                                                                                        onChange={(e) => setBookRide({ ...bookRide, destination: e.target.value })}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    }
                                                                    <div className="sm:col-span-2">
                                                                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                                                            Number of Sits
                                                                        </label>
                                                                        <div className="mt-2">
                                                                            <select
                                                                                id="numSits"
                                                                                name="numSits"
                                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                                                value={bookRide.numSits}
                                                                                onChange={(e) => setBookRide({ ...bookRide, numSits: e.target.value })}
                                                                            >
                                                                                <option value={''}>Select Option</option>
                                                                                {
                                                                                    new Array(ride.sits).fill('').map((item, i) =>
                                                                                        <option value={i + 1}>{i + 1}</option>
                                                                                    )
                                                                                }
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    {
                                                                        ride.isAvailableForBook &&
                                                                        <div className="sm:col-span-2">
                                                                            <label htmlFor="pickupDate" className="block text-sm font-medium leading-6 text-gray-900">
                                                                                On date Journey Start
                                                                            </label>
                                                                            <div className="mt-2">
                                                                                <input
                                                                                    type="date"
                                                                                    id="pickupDate"
                                                                                    className=" rounded border-gray-200 py-3 text-center text-xs [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                                                                                    value={formatDateYMD(bookRide.pickupDate)}
                                                                                    onChange={(e) => setBookRide({ ...bookRide, pickupDate: e.target.value })}
                                                                                // min={new Date().toISOString().split('T')[0]}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    }

                                                                    {
                                                                        ride.isAvailableForBook &&
                                                                        <div className="sm:col-span-2">
                                                                            <label htmlFor="pickupTime" className="block text-sm font-medium leading-6 text-gray-900">
                                                                                On time Journey Start
                                                                            </label>
                                                                            <div className="mt-2">
                                                                                <input
                                                                                    type="time"
                                                                                    id="pickupTime"
                                                                                    className=" rounded border-gray-200 py-3 text-center text-xs [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                                                                                    value={bookRide.pickupTime}
                                                                                    onChange={(e) => setBookRide({ ...bookRide, pickupTime: e.target.value })}
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                    }
                                                                    {
                                                                        false &&

                                                                        <div className="sm:col-span-full">
                                                                            <div className="relative flex gap-x-3">
                                                                                <div className="flex h-6 items-center">
                                                                                    <input
                                                                                        id="isInsurance"
                                                                                        name="isInsurance"
                                                                                        type="checkbox"
                                                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                                                        checked={bookRide.isPrivateBooking}
                                                                                        onChange={(e) => setBookRide({ ...bookRide, isPrivateBooking: e.target.checked })}
                                                                                    />
                                                                                </div>
                                                                                <div className="text-sm leading-6">
                                                                                    <label htmlFor="isInsurance" className="font-medium text-gray-900">
                                                                                        book as Private vehicle
                                                                                    </label>
                                                                                    <p className="text-gray-500">Checked if you want to book as Private vehicle  .</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    }

                                                                </div>


                                                            </div>
                                                        </fieldset>

                                                        <div className="mt-8 w-full gap-4">

                                                            {
                                                                !auth.user._id ?
                                                                    <Link
                                                                        to={'/login'}
                                                                        className="block rounded bg-blue-600 px-5 py-3 my-3 text-xs font-medium text-white hover:bg-blue-500"
                                                                    >
                                                                        Login
                                                                    </Link>
                                                                    :
                                                                    bookRide._id ?
                                                                        <button
                                                                            className="block rounded bg-blue-600 px-5 py-3 my-3 text-xs font-medium text-white hover:bg-blue-500"
                                                                            type='submit'
                                                                        >
                                                                            Update Request
                                                                        </button>
                                                                        :
                                                                        auth.user.isVerified ?

                                                                            <button
                                                                                className="block rounded bg-green-600 px-5 py-3 my-3 text-xs font-medium text-white hover:bg-green-500"
                                                                                type='submit'
                                                                            >
                                                                                Send Request
                                                                            </button>
                                                                            :
                                                                            <Link
                                                                                to={'/VerifyEmail'}
                                                                                className="block rounded bg-blue-600 px-5 py-3 my-3 text-xs font-medium text-white hover:bg-blue-500"
                                                                            >
                                                                                Verify Email
                                                                            </Link>
                                                            }
                                                        </div>
                                                    </form>
                                        }
                                    </div>
                                </div>
                            </div>
                        </section >
            }
        </>
    )
}
