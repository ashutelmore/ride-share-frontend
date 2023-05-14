import React, { useEffect, useState } from 'react'
import { Buffer } from 'buffer';
import { useParams } from 'react-router-dom';
import { getRides } from '../App/RideApi';
import { useNotify } from '../Helper/Notify';
import { formatDateToShow, formatDateYMD, isEmptyField, isEmptyObject } from '../Helper/helper';
import { useAuth } from '../providers/auth';
import { createBookRide, createBookings, getBookings, updateBookings } from '../App/BookRideApi';

export default function BookRide({ }) {
    const params = useParams()
    const [ride, setRide] = useState([])
    const [loader, setLoader] = useState({
        vehicle: false,
        ride: false,
        book: false
    })

    const auth = useAuth()
    const [bookRide, setBookRide] = useState({
        pickupLocation: '',
        destination: '',
        pickupDate: '',
        pickupTime: '',
        numSits: '',
        notes: 'something'
    })

    const [showNotification, contextHolder] = useNotify()

    const bufferToImage = (bufferData) => {
        return `data:${bufferData.image.contentType};base64, ${Buffer.from(bufferData.image.data.data).toString('base64')}`
    };

    useEffect(() => {
        const fetchData = async (id) => {
            setLoader({ ...loader, book: true })
            const res = await getRides({ _id: id })
            console.log('res', res)
            if (res.error) {
                showNotification(res.error.errMessage)
                setLoader({ ...loader, book: false })

            } else if (res.payload) {
                setRide(res.payload[0])
                // showNotification(res.message)
                setLoader({ ...loader, book: false })
            }
        };
        if (params.id)
            fetchData(params.id)
    }, [])

    useEffect(() => {
        const fetchData = async (id) => {
            setLoader({ ...loader, book: true })
            const res = await getBookings({ rideId: id, passangerId: auth.user._id })
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

    console.log('bookRide', bookRide)
    // console.log('ride', ride)
    // console.log('params', params)

    const renderNumbersOfSits = (sites) => {
        for (let index = 1; index <= sites; index++) {

        }
    };

    const onHandleBookRequest = async (e) => {
        e.preventDefault()
        const emptObjList = isEmptyObject(bookRide)
        // const isEmpty = isEmptyField(vehicle.polices.isLicense, vehicle.polices.isInsurance)
        setLoader({ ...loader, ride: true })
        // if (emptObjList.length > 0) {
        //     showNotification("any Input filed should not empty")
        //     setLoader({ ...loader, ride: false })
        //     return
        // }

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

    return (
        <>
            {
                ride._id
                &&
                <section>
                    {contextHolder}
                    <div class="relative mx-auto max-w-screen-xl px-4 py-8">
                        <div class="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
                            <div class="grid grid-cols-2 gap-4 md:grid-cols-1">
                                <img
                                    alt="Les Paul"
                                    src={ride.vehicleId && bufferToImage(ride.vehicleId)}
                                    class="aspect-square w-full rounded-xl object-cover"
                                />
                            </div>

                            <div class="sticky top-0">
                                {
                                    ride.vehicleId.isAvailableForBook ?
                                        <strong
                                            class="rounded-full border border-green-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-green-600"
                                        >
                                            Private Book available
                                        </strong>
                                        :
                                        <strong
                                            class="rounded-full border border-red-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-red-600"
                                        >
                                            Not for Private vehicle
                                        </strong>

                                }

                                <div class="mt-8 flex justify-between">
                                    <div class="max-w-[35ch] space-y-2">
                                        <h1 class="text-xl font-bold sm:text-2xl">
                                            {ride.pickupLocation} to {ride.destination}
                                        </h1>

                                        <h3 class="text-lg">Driver Name {ride.driverId.name}</h3>
                                        <h3 class="text-lg">{ride.driverId.phoneNumber}</h3>

                                        {/* <div class="-ms-0.5 flex">
                                            <svg
                                                class="h-5 w-5 text-yellow-400"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                />
                                            </svg>

                                            <svg
                                                class="h-5 w-5 text-yellow-400"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                />
                                            </svg>

                                            <svg
                                                class="h-5 w-5 text-yellow-400"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                />
                                            </svg>

                                            <svg
                                                class="h-5 w-5 text-yellow-400"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                />
                                            </svg>

                                            <svg
                                                class="h-5 w-5 text-gray-200"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                />
                                            </svg>
                                        </div> */}
                                    </div>

                                    <p class="text-lg font-bold">₹ {ride.pricePerKM}/KM </p>
                                </div>

                                <div class="mt-4">
                                    <div class=" text-left">
                                        <h6>
                                            {ride.vehicleId.descp}
                                        </h6>
                                        <h6>
                                            Journey start from {formatDateToShow(ride.startDate)} and end on {formatDateToShow(ride.endDate)}
                                        </h6>
                                    </div>

                                    {/* <button class="mt-2 text-sm font-medium underline">Read More</button> */}
                                </div>

                                <form class="mt-8" onSubmit={onHandleBookRequest}>
                                    <fieldset>
                                        <legend class="mb-1 text-sm font-medium"> Permissions in Vehicle </legend>

                                        <div class="flex flex-wrap gap-1">
                                            <label for="color_tt" class="cursor-pointer">
                                                {ride.isAllow.chat ?

                                                    <span
                                                        class="group inline-block rounded-full border px-3 py-1 text-xs font-medium bg-green-400 text-white"
                                                    >
                                                        Chat allowed
                                                    </span>
                                                    :
                                                    <span
                                                        class="group inline-block rounded-full border px-3 py-1 text-xs font-medium bg-green-400 text-white"
                                                    >
                                                        Chat not allowed
                                                    </span>
                                                }
                                            </label>
                                            <label for="color_tt" class="cursor-pointer">
                                                {ride.isAllow.food ?

                                                    <span
                                                        class="group inline-block rounded-full border px-3 py-1 text-xs font-medium bg-green-400 text-white"
                                                    >
                                                        food allowed
                                                    </span>
                                                    :
                                                    <span
                                                        class="group inline-block rounded-full border px-3 py-1 text-xs font-medium bg-red-400 text-white"
                                                    >
                                                        food not allowed
                                                    </span>
                                                }
                                            </label>
                                            <label for="color_tt" class="cursor-pointer">
                                                {ride.isAllow.music ?

                                                    <span
                                                        class="group inline-block rounded-full border px-3 py-1 text-xs font-medium bg-green-400 text-white"
                                                    >
                                                        music allowed
                                                    </span>
                                                    :
                                                    <span
                                                        class="group inline-block rounded-full border px-3 py-1 text-xs font-medium bg-red-400 text-white"
                                                    >
                                                        music not allowed
                                                    </span>
                                                }
                                            </label>
                                            <label for="color_tt" class="cursor-pointer">
                                                {ride.isAllow.chat ?

                                                    <span
                                                        class="group inline-block rounded-full border px-3 py-1 text-xs font-medium bg-green-400 text-white"
                                                    >
                                                        Chat allowed
                                                    </span>
                                                    :
                                                    <span
                                                        class="group inline-block rounded-full border px-3 py-1 text-xs font-medium bg-red-400 text-white"
                                                    >
                                                        Chat not allowed
                                                    </span>
                                                }
                                            </label>
                                        </div>
                                    </fieldset>

                                    <fieldset class="mt-4">

                                        <div class="flex flex-wrap ">

                                            <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                                                <div className="sm:col-span-2">
                                                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Number of Sits
                                                    </label>
                                                    <div className="mt-2">
                                                        <select
                                                            id="isAvailableForBook"
                                                            name="isAvailableForBook"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                            value={bookRide.numSits}
                                                            onChange={(e) => setBookRide({ ...bookRide, numSits: e.target.value })}
                                                        >
                                                            <option value={''}>Select Option</option>
                                                            {
                                                                new Array(ride.vehicleId.sits).fill('').map((item, i) =>
                                                                    <option value={i + 1}>{i + 1}</option>
                                                                )
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <label htmlFor="pickupDate" className="block text-sm font-medium leading-6 text-gray-900">
                                                        On date Journey Start
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="date"
                                                            id="pickupDate"
                                                            class=" rounded border-gray-200 py-3 text-center text-xs [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                                                            value={formatDateYMD(bookRide.pickupDate)}
                                                            onChange={(e) => setBookRide({ ...bookRide, pickupDate: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <label htmlFor="pickupTime" className="block text-sm font-medium leading-6 text-gray-900">
                                                        On time Journey Start
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="time"
                                                            id="pickupTime"
                                                            class=" rounded border-gray-200 py-3 text-center text-xs [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                                                            value={bookRide.pickupTime}
                                                            onChange={(e) => setBookRide({ ...bookRide, pickupTime: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    </fieldset>

                                    <div class="mt-8 w-full gap-4">

                                        {
                                            bookRide._id ?
                                                <button
                                                    class="block rounded bg-blue-600 px-5 py-3 my-3 text-xs font-medium text-white hover:bg-blue-500"
                                                    type='submit'
                                                >
                                                    Update Request
                                                </button>
                                                :
                                                <button
                                                    class="block rounded bg-green-600 px-5 py-3 my-3 text-xs font-medium text-white hover:bg-green-500"
                                                    type='submit'
                                                >
                                                    Send Request
                                                </button>
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section >
            }
        </>
    )
}
