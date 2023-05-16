import React, { useEffect, useState } from 'react'
import { useNotify } from '../Helper/Notify'
import { useAuth } from '../providers/auth'
import { deleteBookings, getBookings, updateBookings } from '../App/BookRideApi'
import { formatDateToShow } from '../Helper/helper'
import { Link, useParams } from 'react-router-dom';


const header = [
    'Vehicle Name',
    'Type',
    'Company',
    'Price per KM',
    'Vehicle Number',
]




export default function BookingReq() {


    const params = useParams()
    const [bookings, setBookings] = useState([])
    const [showNotification, contextHolder] = useNotify()
    const [refetch, setRefetch] = useState(false)
    const [loader, setLoader] = useState({
        vehicle: false,
        booking: false
    })

    const auth = useAuth()

    useEffect(() => {
        const fetchData = async (id) => {
            setLoader({ ...loader, booking: true })
            const res = await getBookings({ rideId: id, driverId: auth.user._id })
            if (res.error) {
                showNotification(res.error.errMessage)
                setLoader({ ...loader, booking: false })

            } else if (res.payload) {
                setBookings(res.payload)
                showNotification(res.message)
                setLoader({ ...loader, booking: false })
            }
        };
        if (params.id)
            fetchData(params.id)
    }, [refetch])
    const bufferToImage = (bufferData) => {
        return `data:${bufferData.image.contentType};base64, ${Buffer.from(bufferData.image.data.data).toString('base64')}`
    };


    const onHandleStatus = async (item, type) => {
        console.log('item', item, type)

        let data = {
            ...item,
        }
        if (type === 'accepted') {//accept
            data = {
                ...data,
                status: 'accepted'
            }
        }
        else if (type === 'rejected') {
            // status:cancelled
            data = {
                ...data,
                status: 'rejected'
            }

        } else if (type === 'completed') {
            // status:completed
            data = {
                ...data,
                status: 'completed'
            }
        } else if (type === 'cancelled') {
            // status:completed
            data = {
                ...data,
                status: 'cancelled'
            }
        }
        onHandleBookRequestUpdate(data)
    };

    const onHandleBookRequestUpdate = async (data) => {

        const res = await updateBookings(data._id, data)
        console.log('res', res)
        if (res.error) {
            showNotification(res.error.errMessage)
            setLoader({ ...loader, ride: false })

        } else if (res.payload) {
            showNotification(res.message)
            setLoader({ ...loader, ride: false })
            setRefetch(!refetch)
        }
    };


    const renderStatusBtns = (item) => {
        console.log('item.status', item.status)
        if (item.status === 'accepted') {//accept
            return <td className="px-5 py-5 bg-white text-sm">
                <button
                    // to={'/bookride/' + item.rideId}
                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
                    onClick={() => onHandleStatus(item, 'completed')}
                >
                    completed
                </button>
                <button
                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
                    onClick={() => onHandleStatus(item, 'cancelled')}
                >

                    cancelled
                </button>
            </td>
        }
        else if (item.status === 'completed') {
            return <td className="px-5 py-5 bg-white text-sm">
                <button
                    // to={'/bookride/' + item.rideId}
                    className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-l"
                >
                    completed
                </button>
            </td>
        } else {
            return <td className="px-5 py-5 bg-white text-sm">
                <button
                    // to={'/bookride/' + item.rideId}
                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
                    onClick={() => onHandleStatus(item, 'accepted')}
                >
                    Accept
                </button>
                <button
                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
                    onClick={() => onHandleStatus(item, 'rejected')}
                >

                    Reject
                </button>
            </td>
        }
    };

    console.log('bookings', bookings)
    return (
        <>
            {contextHolder}
            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <div>
                        <header className="bg-white shadow">
                            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Booking Requests</h1>
                                {/* <h2 className="text-base font-semibold leading-7 text-gray-900">This information will be displayed publicly so be careful what you share.</h2> */}
                            </div>
                        </header>
                    </div>
                    {/* <div className="my-2 flex sm:flex-row flex-col">
                        <div className="flex flex-row mb-1 sm:mb-0">
                            <div className="relative">
                                <select
                                    className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                    <option>5</option>
                                    <option>10</option>
                                    <option>20</option>
                                </select>
                                <div
                                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="relative">
                                <select
                                    className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                                    <option>All</option>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                                <div
                                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="block relative">
                            <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                                    <path
                                        d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                                    </path>
                                </svg>
                            </span>
                            <input placeholder="Search"
                                className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                        </div>
                    </div> */}
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            passanger Name
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Type
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Locaton
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Pickup date
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Pickup time
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        bookings.length <= 0
                                            ?
                                            <tr>
                                                <td>
                                                    No data found
                                                </td>
                                            </tr>
                                            :
                                            bookings.map((item, i) =>

                                                <tr key={i}>
                                                    <td className="px-5 py-5 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">{formatDateToShow(item.updatedAt)}</p>
                                                    </td>
                                                    <td className="px-5 py-5 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">{item.passangerId.name}</p>
                                                    </td>
                                                    <td className="px-5 py-5 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">{item.isPrivateBooking ? "Private" : "Ride"}</p>
                                                    </td>
                                                    <td className="px-5 py-5 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">{item.pickupLocation}-{item.destination}</p>
                                                    </td>
                                                    <td className="px-5 py-5 bg-white text-sm">
                                                        <span
                                                            className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                                                            <span aria-hidden
                                                                className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                                                            <span className="relative">{item.status}</span>
                                                        </span>
                                                    </td>


                                                    <td className="px-5 py-5 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">{formatDateToShow(item.pickupDate)}</p>
                                                    </td>
                                                    <td className="px-5 py-5 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">{item.pickupTime}</p>
                                                    </td>
                                                    {renderStatusBtns(item)}
                                                </tr>
                                            )}
                                </tbody>
                            </table>
                            {/* <div
                                className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                                <span className="text-xs xs:text-sm text-gray-900">
                                    Showing 1 to 4 of 50 Entries
                                </span>
                                <div className="inline-flex mt-2 xs:mt-0">
                                    <button
                                        className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                                        Prev
                                    </button>
                                    <button
                                        className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                                        Next
                                    </button>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
