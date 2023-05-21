
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useNotify } from '../../Helper/Notify'
import { createVehicles, getVehicles } from '../../App/VehicleApi'
import { useAuth } from '../../providers/auth'
import { formatDateYMD, isEmptyObject } from '../../Helper/helper'
import { createRides, getRides, updateRides } from '../../App/RideApi'

export default function PostRide() {
    const [showNotification, contextHolder] = useNotify()
    const navigate = useNavigate()
    const params = useParams()
    const [loader, setLoader] = useState({
        vehicle: false,
        ride: false,
    })
    const auth = useAuth()


    const [vehicles, setVehicles] = useState([])
    const [ride, setRide] = useState({
        // driverId: '',
        // passengers: ['passengerId1', 'passengerId2'],

        vehicleId: '',
        pickupLocation: '',
        destination: '',
        startDate: '',
        endDate: '',
        sits: '',
        isAvailableForBook: false,
        // duration: '',
        price: '',
        isAllow: {
            chat: null,
            smoke: null,
            music: null,
            food: null,
            ladies: null
        },
        status: 'pending',
        note: ''
    })

    const onHandleSaveRide = async (e) => {
        e.preventDefault()

        setLoader({ ...loader, ride: true })
        const emptObjList = isEmptyObject(ride, ['destination', 'endDate', 'startDate', 'note'])
        // const isEmpty = isEmptyField(vehicle.polices.isLicense, vehicle.polices.isInsurance)
        if (emptObjList.length > 0) {
            showNotification("any Input filed should not empty")
            setLoader({ ...loader, ride: false })
            return
        }
        // return

        if (ride._id) {
            updateRideDetails()
            return
        }
        const data = {
            ...ride,
            driverId: auth.user._id,
        }
        const res = await createRides(data)
        if (res.error) {
            showNotification(res.error.errMessage)
            setLoader({ ...loader, ride: false })

        } else if (res.payload) {
            showNotification(res.message)
            setLoader({ ...loader, ride: false })
        }
    };

    const updateRideDetails = async () => {
        const data = {
            ...ride,
        }
        const res = await updateRides(ride._id, data)
        if (res.error) {
            showNotification(res.error.errMessage)
            setLoader({ ...loader, ride: false })

        } else if (res.payload) {
            showNotification(res.message)
            setLoader({ ...loader, ride: false })
        }
    };

    //to fetch all list of vehicle to selct
    useEffect(() => {
        if (isEmptyObject(auth.user, ['profilePhoto']) && isEmptyObject(auth.user.address, [])) {
            window.alert("To add vehicle you need to complete your profile first")
            navigate('/profile')
            return
        }
        const fetchData = async (id) => {
            setLoader({ ...loader, vehicle: true })

            const res = await getVehicles({ driverId: id, status: 'approved' })
            if (res.error) {
                setLoader({ ...loader, vehicle: false })
            } else if (res.payload) {
                setVehicles(res.payload)

                if (auth.user.role == 'common' && res.payload.length == 0) {
                    window.alert("To add ride you need to add at least one vehicle with approved status")
                    navigate('/postvehicle')
                    return
                }
                setLoader({ ...loader, vehicle: false })
            }
        };
        if (ride._id && auth.user.role == 'admin')
            fetchData(ride.driverId._id)
        else if (vehicles.length <= 0)
            fetchData(auth.user._id)
    }, [ride])

    console.log('ride', ride)
    // fetch one ride if already created
    useEffect(() => {


        const fetchData = async (id) => {
            setLoader({ ...loader, ride: true })
            const res = await getRides({ _id: id })
            if (res.error) {
                setLoader({ ...loader, ride: false })
            } else if (res.payload) {
                setRide(res.payload[0])
                setLoader({ ...loader, ride: false })
            }
        };
        if (params.id)
            fetchData(params.id)
    }, [])


    console.log('ride', ride)
    return (
        <form onSubmit={onHandleSaveRide}>
            {contextHolder}
            <div className="space-y-12 w-3/4 sm:px-4 mx-auto">
                <div className="border-b border-gray-900/10 pb-12">
                    <header className="bg-white shadow">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Post Your Ride</h1>
                            {/* <h2 className="text-base font-semibold leading-7 text-gray-900">This information will be displayed publicly so be careful what you share.</h2> */}
                        </div>
                    </header>

                </div>
                <div className=" pb-12">
                    <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                Is available for private booking
                            </label>
                            <div className="mt-2">
                                <select
                                    id="isAvailableForBook"
                                    name="isAvailableForBook"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={ride.isAvailableForBook}
                                    onChange={(e) => setRide({ ...ride, isAvailableForBook: JSON.parse(e.target.value) })}
                                >
                                    {/* <option value={undefined}>Select Option</option> */}
                                    <option value={false}>No</option>
                                    <option value={true}>Yes</option>
                                </select>
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600 text-left">Required.</p>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="vehicle" className="block text-sm font-medium leading-6 text-gray-900">
                                Chose which vehicle
                            </label>
                            <div className="mt-2">
                                <select
                                    id="vehicle"
                                    name="vehicle"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={ride.vehicleId}
                                    onChange={(e) => setRide({ ...ride, vehicleId: e.target.value })}
                                >
                                    <option value={''}>Select Option</option>
                                    {
                                        vehicles.map((item, i) =>
                                            <option key={i} value={item._id}>{item.vehicleName}</option>
                                        )
                                    }
                                </select>
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600 text-left">Required.</p>

                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="sits" className="block text-sm font-medium leading-6 text-gray-900">
                                Number of Sits
                            </label>
                            <div className="mt-2">
                                <input
                                    id="sits"
                                    name="sits"
                                    type="number"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={ride.sits}
                                    onChange={(e) => setRide({ ...ride, sits: e.target.value })}
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600 text-left">Required.</p>

                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                Price per Seat
                            </label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    name="price"
                                    id="price"
                                    autoComplete="address-level2"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={ride.price}
                                    onChange={(e) => setRide({ ...ride, price: e.target.value })}
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600 text-left">Required.</p>

                        </div>



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
                                    value={ride.pickupLocation}
                                    onChange={(e) => setRide({ ...ride, pickupLocation: e.target.value })}
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600 text-left">Required.</p>

                        </div>
                        {
                            !ride.isAvailableForBook &&
                            <>
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
                                            value={ride.destination}
                                            onChange={(e) => setRide({ ...ride, destination: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="startDate" className="block text-sm font-medium leading-6 text-gray-900">
                                        Start Journey Date
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="date"
                                            name="startDate"
                                            id="startDate"
                                            autoComplete="address-level1"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={formatDateYMD(ride.startDate)}
                                            onChange={(e) => setRide({ ...ride, startDate: e.target.value })}
                                        />
                                    </div>
                                </div>


                                <div className="sm:col-span-3">
                                    <label htmlFor="endDate" className="block text-sm font-medium leading-6 text-gray-900">
                                        End Journey Date
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="date"
                                            name="endDate"
                                            id="endDate"
                                            autoComplete="endDate"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={formatDateYMD(ride.endDate)}
                                            onChange={(e) => setRide({ ...ride, endDate: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                            <label htmlFor="notes" className="block text-sm font-medium leading-6 text-gray-900">
                                Notes
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="notes"
                                    name="notes"
                                    rows={3}
                                    placeholder='Write a few sentences about your ride'
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                    value={ride.note}
                                    onChange={(e) => setRide({ ...ride, note: e.target.value })}
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600 text-left">Optional.</p>
                        </div>

                    </div>

                    <div className="border-b border-gray-900/10 pb-12">

                        <div className="mt-10 space-y-10">
                            <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-gray-900">Permissions</legend>
                                <div className="mt-6  flex justify-around">
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="smoke"
                                                name="smoke"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                checked={ride.isAllow.smoke}
                                                onChange={(e) => setRide({ ...ride, isAllow: { ...ride.isAllow, smoke: e.target.checked } })}
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="smoke" className="font-medium text-gray-900">
                                                Smoke
                                            </label>
                                            {/* <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p> */}
                                        </div>
                                    </div>
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="chat"
                                                name="chat"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                checked={ride.isAllow.chat}
                                                onChange={(e) => setRide({ ...ride, isAllow: { ...ride.isAllow, chat: e.target.checked } })}
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="chat" className="font-medium text-gray-900">
                                                Chat
                                            </label>
                                            {/* <p className="text-gray-500">Get notified when a candidate applies for a job.</p> */}
                                        </div>
                                    </div>
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="music"
                                                name="music"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                checked={ride.isAllow.music}
                                                onChange={(e) => setRide({ ...ride, isAllow: { ...ride.isAllow, music: e.target.checked } })}
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="music" className="font-medium text-gray-900">
                                                Music
                                            </label>
                                            {/* <p className="text-gray-500">Get notified when a candidate applies for a job.</p> */}
                                        </div>
                                    </div>
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="food"
                                                name="food"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                checked={ride.isAllow.food}
                                                onChange={(e) => setRide({ ...ride, isAllow: { ...ride.isAllow, food: e.target.checked } })}
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="food" className="font-medium text-gray-900">
                                                Food
                                            </label>
                                            {/* <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p> */}
                                        </div>
                                    </div>
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="ladies"
                                                name="ladies"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                checked={ride.isAllow.ladies}
                                                onChange={(e) => setRide({ ...ride, isAllow: { ...ride.isAllow, ladies: e.target.checked } })}
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="ladies" className="font-medium text-gray-900">
                                                ladies
                                            </label>
                                            {/* <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p> */}
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            {/* <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-gray-900">  </legend>
                                <p className="mt-1 text-sm leading-6 text-gray-600">These are de    livered via SMS to your mobile phone.</p>
                                <div className="mt-6 space-y-6">
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="push-everything"
                                            name="push-notifications"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                            Everything
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="push-email"
                                            name="push-notifications"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Same as email
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="push-nothing"
                                            name="push-notifications"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                                            No push notifications
                                        </label>
                                    </div>
                                </div>P
                            </fieldset> */}
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-start gap-x-6 mb-14">
                        {/* <button type="button" className="text-2xl font-semibold leading-6 text-gray-900">
                    Cancel
                </button> */}

                        {
                            loader.ride ?
                                <button
                                    disabled={true}
                                    className="rounded-md cursor-progress bg-indigo-200 px-3 py-2 text-2xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Loading...
                                </button>
                                :
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-2xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Save
                                </button>
                        }
                    </div>
                </div>



            </div>

        </form>
    )
}
