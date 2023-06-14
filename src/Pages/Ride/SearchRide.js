import React, { useEffect, useRef, useState } from 'react'
import { Buffer } from 'buffer';
import { getRides, searchRides } from '../../App/RideApi';
import { bufferToImage, formatDateToShow, isEmptyField } from '../../Helper/helper';
import { getVehicles } from '../../App/VehicleApi';
import { Link, useParams } from 'react-router-dom';
import { useNotify } from '../../Helper/Notify';
import { LoaderSmall } from '../../Helper/Loader';


export default function SearchRide() {
    const [open, setOpen] = useState(false)
    const [openPickup, setOpenPickup] = useState(false)
    const [openDesti, setOpenDesti] = useState(false)
    const [showNotification, contextHolder] = useNotify()
    const params = useParams()
    const [rides, setRides] = useState([])
    const [ridesRecommend, setRidesRecommend] = useState([])
    const [loader, setLoader] = useState({
        vehicle: false,
        ride: false,
    })
    let menuRef = useRef();
    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setOpen(false);
                setOpenPickup(false);
                setOpenDesti(false);
                setRidesRecommend([])
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });
    function formatDate(dateString) {
        if (dateString == '')
            return
        const parts = dateString.split('-');
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Month is zero-based
        const day = parseInt(parts[2], 10);

        const dateObj = new Date(Date.UTC(year, month, day));

        const formattedDate = dateObj.toISOString();
        return formattedDate;
    }

    const [search, setSearch] = useState({
        pickup: params.pickup || '',
        desti: params.desti || '',
        startDate: params.start || '',
        endDate: params.end || '',

        type: 'ride'
    })

    const searchInput = async (e) => {
        const searchFieldName = e.target.name
        const searchFieldValue = e.target.value
        // if (searchFieldChanges == startDate || searchFieldChanges == endDate)
        setSearch({ ...search, [searchFieldName]: searchFieldValue })

        console.log('searchFieldChanges', searchFieldName)
        console.log('searchFieldValue', searchFieldValue)
        if (searchFieldName == 'pickup') {

            const res = await searchRides({
                pickup: searchFieldValue,
                // desti: search.desti,
                // start: formatDate(search.startDate) || '',
                // end: formatDate(search.endDate) || '',
                limit: 4,
                type: search.type || ''
            })
            if (res.error) {
                showNotification(res.error.errMessage)
            } else if (res.payload) {
                const uniqueSuggestions = res.payload.reduce((unique, ride) => {
                    // Check if the ride already exists in the unique array
                    if (!unique.some((p) => p.pickupLocation === ride.pickupLocation)) {
                        unique.push(ride);
                    }
                    return unique;
                }, []);
                setRidesRecommend(uniqueSuggestions)
            }
            setOpenDesti(false)
            setOpenPickup(true)
        } else if (searchFieldName == 'desti') {

            const res = await searchRides({
                pickup: search.pickup,
                desti: searchFieldValue,
                limit: 4,
                type: search.type || ''
            })
            if (res.error) {
                showNotification(res.error.errMessage)
            } else if (res.payload) {
                const uniqueSuggestions = res.payload.reduce((unique, ride) => {
                    // Check if the ride already exists in the unique array
                    if (!unique.some((p) => p.destination === ride.destination)) {
                        unique.push(ride);
                    }
                    return unique;
                }, []);
                setRidesRecommend(uniqueSuggestions)
            }
            setOpenPickup(false)
            setOpenDesti(true)
        }


        // setOpen(true)

    };
    console.log('ridesRecommend', ridesRecommend)

    const onClickRecommended = (item, type) => {

        if (type == 'pickup') {
            setSearch({ ...search, pickup: item.pickupLocation })
            setOpenPickup(true)
        }
        else if (type == 'desti') {
            setSearch({ ...search, desti: item.destination })
            setOpenDesti(true)
        }
        setRidesRecommend([])
    };

    const onClickSearch = async (e) => {

        setLoader({ ...loader, vehicle: true })
        const res = await searchRides({
            pickup: search.pickup,
            desti: search.desti,
            start: formatDate(search.startDate) || '',
            end: formatDate(search.endDate) || '',
            type: search.type || ''
        })
        if (res.error) {
            setLoader({ ...loader, vehicle: false })

        } else if (res.payload) {
            setRides(res.payload)
            setLoader({ ...loader, vehicle: false })
        }

    };



    console.log('rides', rides)

    return (
        <>
            {contextHolder}
            <header className="bg-white shadow container mx-auto px-4 sm:px-8">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Search Your Ride</h1> </div>
            </header>
            <div className=" w-full  z-10 mt-5  container mx-auto px-4 sm:px-8 h-screen" >
                <div className="border border-gray-300 p-6 grid grid-cols-1 gap-6 bg-white shadow-lg rounded-lg" >
                    <div className="flex flex-col md:flex-row">
                        <div className="">
                            <select
                                className="border p-2 rounded w-[150px]"
                                value={search.type}
                                onChange={(e) => setSearch({ ...search, type: e.target.value })}
                            >
                                <option value={'ride'}>Ride</option>
                                <option value={'vehicle'}>Private Vehicle</option>
                            </select>
                        </div>
                    </div>
                    <div className="" ref={menuRef}>
                        <div className="grid grid-cols-2 gap-2 border border-gray-200 p-2 rounded w-full">
                            <div className="  rounded p-1 w-full ">
                                <div className="">
                                    <div className="inline-flex flex-col justify-center relative text-gray-500 w-full">
                                        <div className="relative w-full">
                                            <input
                                                type="text"
                                                className="p-2 pl-8 rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 w-full"
                                                placeholder="Pickup location"
                                                name='pickup'
                                                value={search.pickup}
                                                onChange={e => searchInput(e)}
                                            />
                                            <svg className="w-4 h-4 absolute left-2.5 top-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        {
                                            openPickup &&
                                            <ul className="bg-white border border-gray-100 w-full mt-2 absolute top-10">
                                                {
                                                    ridesRecommend.map((item, i) =>
                                                        <li className="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900"
                                                            key={i}
                                                            onClick={() => onClickRecommended(item, 'pickup')}
                                                        >
                                                            <svg className="absolute w-4 h-4 left-2 top-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                                                            </svg>
                                                            {/* <b>Gar</b>dameer - Italië */}
                                                            {item.pickupLocation}
                                                        </li>
                                                    )}
                                            </ul>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="rounded p-1 w-full  ">
                                <div className="">
                                    <div className="inline-flex flex-col justify-center relative text-gray-500 w-full">
                                        <div className="relative w-full">
                                            <input type="text"
                                                className="p-2 pl-8 rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 w-full"
                                                placeholder="Destination location"
                                                name='desti'
                                                value={search.desti}
                                                onChange={e => searchInput(e)}

                                            />
                                            <svg className="w-4 h-4 absolute left-2.5 top-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        {
                                            openDesti &&
                                            <ul className="bg-white border border-gray-100 w-full mt-2 absolute top-10">
                                                {
                                                    ridesRecommend.map((item, i) =>
                                                        <li className="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900"
                                                            key={i}
                                                            onClick={() => onClickRecommended(item, 'desti')}
                                                        >
                                                            <svg className="absolute w-4 h-4 left-2 top-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                                                            </svg>
                                                            {/* <b>Gar</b>dameer - Italië */}
                                                            {item.destination}
                                                        </li>
                                                    )}
                                            </ul>
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                        {
                            // search.type == 'ride' 
                            false
                            &&
                            <div className="grid grid-cols-2 gap-2 border border-gray-200 p-2 rounded">
                                <div className="rounded p-1 w-full ">
                                    <div className="">
                                        <div className="inline-flex flex-col justify-center relative text-gray-500">
                                            <div className="relative">
                                                <input type="date"
                                                    className="p-2 pl-8 rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 "
                                                    placeholder="Start Date"
                                                    name='startDate'
                                                    value={search.startDate}
                                                    onChange={e => searchInput(e)}

                                                />
                                                <svg className="w-4 h-4 absolute left-2.5 top-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </div>
                                            {
                                                open &&
                                                <ul className="bg-white border border-gray-100 w-full mt-2 absolute top-10">
                                                    {
                                                        new Array(4).fill("").map((item, i) =>
                                                            <li className="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900">
                                                                <svg className="absolute w-4 h-4 left-2 top-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                                                                </svg>
                                                                <b>Gar</b>dameer - Italië
                                                            </li>
                                                        )}
                                                </ul>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded p-1 w-full ">
                                    <div className="">
                                        <div className="inline-flex flex-col justify-center relative text-gray-500">
                                            <div className="relative">
                                                <input type="date"
                                                    className="p-2 pl-8 rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 "
                                                    placeholder="End location"
                                                    name='endDate'
                                                    value={search.endDate}
                                                    onChange={e => searchInput(e)}
                                                />
                                                <svg className="w-4 h-4 absolute left-2.5 top-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </div>
                                            {
                                                open &&
                                                <ul className="bg-white border border-gray-100 w-full mt-2 absolute top-10">
                                                    {
                                                        new Array(4).fill("").map((item, i) =>
                                                            <li className="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900">
                                                                <svg className="absolute w-4 h-4 left-2 top-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                                                                </svg>
                                                                <b>Gar</b>dameer - Italië
                                                            </li>
                                                        )}
                                                </ul>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="p-2 border w-1/4 rounded-md bg-gray-800 text-white"
                            onClick={onClickSearch}
                        >Search</button>
                    </div>
                </div>
                <div className="border my-6 border-gray-300 p-6 grid grid-cols-1 gap-6 bg-white shadow-lg rounded-lg">
                    {
                        loader.vehicle ?
                            <LoaderSmall />
                            :
                            <div className="flex flex-col ">

                                {/* Result card */}

                                {
                                    rides.length <= 0 ?
                                        isEmptyField(search.desti, search.pickup)
                                            ?

                                            <p>Click on search button</p>
                                            :
                                            <p>No Result Found</p>
                                        :
                                        rides.map((item, i) =>

                                            <div className="bg-white border border-white shadow-lg  rounded-3xl p-4 lg:mx-40 my-2 ">

                                                <div className="flex-none sm:flex">
                                                    <div className=" relative h-32 w-32   sm:mb-0 mb-3">
                                                        <img
                                                            // src="https://tailwindcomponents.com/storage/avatars/njkIbPhyZCftc4g9XbMWwVsa7aGVPajYLRXhEeoo.jpg"
                                                            src={item.vehicleId && bufferToImage(item.vehicleId)}
                                                            alt="aji"
                                                            className=" w-32 h-32 object-cover rounded-2xl" />

                                                    </div>
                                                    <div className="flex-auto sm:ml-5 justify-evenly">
                                                        <div className="flex items-center justify-between sm:mt-2">
                                                            <div className="flex items-center">
                                                                <div className="flex flex-col">
                                                                    <div className="w-full flex-none text-lg text-gray-800 font-bold leading-none">{item.driverId.name}</div>
                                                                    {
                                                                        item.isAvailableForBook ?
                                                                            <>

                                                                                <div className="flex-auto text-gray-500 my-1">
                                                                                    <span className="mr-3 ">At {item.pickupLocation}</span>
                                                                                </div>

                                                                                <div className="flex-auto text-gray-500 my-1">
                                                                                    <span className="mr-3 "> {item.vehicleId.vehicleName}</span>
                                                                                </div>
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <div className="flex-auto text-gray-500 my-1">
                                                                                    <span className="mr-3 ">{item.pickupLocation}</span> to <span className="mr-3  max-h-0"></span><span>{item.destination}</span>
                                                                                </div>
                                                                                <div className="flex-auto text-gray-500 my-1">
                                                                                    <span className="mr-3 ">on {formatDateToShow(item.startDate)}</span> to <span className="mr-3  max-h-0"></span><span>{formatDateToShow(item.endDate)}</span>
                                                                                </div>
                                                                            </>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-row items-center">
                                                            {/* <div className="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                className="h-5 w-5 text-yellow-500">
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                </path>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                className="h-5 w-5 text-yellow-500">
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                </path>
                            </svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                className="h-5 w-5 text-yellow-500">
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                </path>
                            </svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                className="h-5 w-5 text-yellow-500">
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                </path>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" className="h-5 w-5 text-yellow-500">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z">
                                </path>
                            </svg>
                        </div> */}
                                                            <div className="flex-1 inline-flex  hidden items-center">

                                                            </div>
                                                        </div>
                                                        <div className="flex pt-2  text-sm text-gray-500">
                                                            <div className="flex-1 inline-flex items-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20"
                                                                    fill="currentColor">
                                                                    <path
                                                                        d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z">
                                                                    </path>
                                                                </svg>
                                                                <p className="">{item.sits} Seets</p>
                                                            </div>
                                                            <div className="flex-1 inline-flex items-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20"
                                                                    fill="currentColor">
                                                                    <path fill-rule="evenodd"
                                                                        d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                                                                        clip-rule="evenodd"></path>
                                                                </svg>
                                                                <p className="">Rs. {item.price}/km charges</p>
                                                            </div>
                                                            <div className="flex-1 inline-flex items-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20"
                                                                    fill="currentColor">
                                                                    <path fill-rule="evenodd"
                                                                        d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                                                                        clip-rule="evenodd"></path>
                                                                </svg>
                                                                <p className="">More...</p>
                                                            </div>
                                                            <Link to={'/bookride/' + item._id} className="flex-no-shrink bg-green-400 hover:bg-green-500 px-5 ml-4 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-300 hover:border-green-500 text-white rounded-full transition ease-in duration-300">
                                                                Book Now
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                }
                            </div>
                    }

                </div>
            </div>
        </>
    )
}
