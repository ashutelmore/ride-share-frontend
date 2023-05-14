import React, { useEffect, useState } from 'react'
import { Buffer } from 'buffer';
import { deleteVehicles, getVehicles } from '../../App/VehicleApi';
import { useAuth } from '../../providers/auth';
import { useNotify } from '../../Helper/Notify';
import { Link } from 'react-router-dom';


const header = [
    'Vehicle Name',
    'Type',
    'Is Available For Booking',
    'Price per KM',
    'Vehicle Number',
    'Action',
]
export default function Vehicles() {

    const [vehicles, setVehicles] = useState([])
    const [showNotification, contextHolder] = useNotify()
    const [refetch, setRefetch] = useState(false)
    const [loader, setLoader] = useState({
        vehicle: false
    })

    const auth = useAuth()

    useEffect(() => {
        const fetchData = async (id) => {
            setLoader({ ...loader, vehicle: true })
            const res = await getVehicles({ driverId: id })
            if (res.error) {
                showNotification(res.error.errMessage)
                setLoader({ ...loader, vehicle: false })

            } else if (res.payload) {
                setVehicles(res.payload)
                showNotification(res.message)
                setLoader({ ...loader, vehicle: false })
            }
        };
        // if (vehicles.length <= 0)
        console.log('refetch', refetch)
        fetchData(auth.user._id)
    }, [refetch])
    const bufferToImage = (bufferData) => {
        return `data:${bufferData.image.contentType};base64, ${Buffer.from(bufferData.image.data.data).toString('base64')}`
    };
    const onHandleDelete = async (item) => {

        if (!window.confirm("Are sure want to delete")) {

            return
        }

        const res = await deleteVehicles(item._id)
        console.log('res', res)
        if (res.error) {
            showNotification(res.error.errMessage)
        } else if (res.payload) {
            setRefetch(!refetch)
            showNotification(res.message)
        }
    };
    console.log('vehicles', vehicles)

    return (
        <>
            {contextHolder}
            <div class="container mx-auto px-4 sm:px-8">

                <div class="py-8">
                    <div>
                        <header className="bg-white shadow">
                            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                                <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Vehicles</h1>
                                {/* <h2 className="text-base font-semibold leading-7 text-gray-900">This information will be displayed publicly so be careful what you share.</h2> */}
                            </div>
                        </header>
                    </div>
                    {/* search */}
                    <div class="my-2 flex sm:flex-row flex-col">
                        <div class="flex flex-row mb-1 sm:mb-0">
                            <div class="relative">
                                <select
                                    class="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                    <option>5</option>
                                    <option>10</option>
                                    <option>20</option>
                                </select>
                                <div
                                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                            <div class="relative">
                                <select
                                    class="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                                    <option>All</option>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                                <div
                                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="block relative">
                            <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                                <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current text-gray-500">
                                    <path
                                        d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                                    </path>
                                </svg>
                            </span>
                            <input placeholder="Search"
                                class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                        </div>
                    </div>
                    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table class="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        {
                                            header.map((item) =>

                                                <th
                                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    {item}
                                                </th>
                                            )
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        vehicles.length <= 0
                                            ?
                                            <tr>
                                                <td>
                                                    No data found
                                                </td>
                                            </tr>
                                            :
                                            vehicles.map((item) =>

                                                <tr>
                                                    <td class="px-5 py-5 bg-white text-sm">
                                                        <div class="flex items-center">
                                                            <div class="flex-shrink-0 w-10 h-10">
                                                                <img class="w-full h-full "
                                                                    src={bufferToImage(item)}
                                                                    alt="" />
                                                            </div>
                                                            <div class="ml-3">
                                                                <p class="text-gray-900 whitespace-no-wrap">
                                                                    {item.vehicleName}
                                                                </p>
                                                            </div>
                                                        </div>

                                                    </td>
                                                    <td class="px-5 py-5 bg-white text-sm">
                                                        <p class="text-gray-900 whitespace-no-wrap">{item.type}</p>
                                                    </td>
                                                    <td class="px-5 py-5 bg-white text-sm">
                                                        <p class="text-gray-900 whitespace-no-wrap">{item.isAvailableForBook ? "Yes" : "No"}</p>
                                                    </td>
                                                    <td class="px-5 py-5 bg-white text-sm">
                                                        <p class="text-gray-900 whitespace-no-wrap">{item.pricePerKm}</p>
                                                    </td>


                                                    <td class="px-5 py-5 bg-white text-sm">
                                                        <p class="text-gray-900 whitespace-no-wrap">{item.vehicleNumber}</p>
                                                    </td>
                                                    <td class="px-5 py-5 bg-white text-sm">
                                                        <Link
                                                            to={'/postvehicle/' + item._id}
                                                            class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                                                            View/Edit
                                                        </Link>
                                                        <button
                                                            class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
                                                            onClick={() => onHandleDelete(item)}
                                                        >

                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                    }

                                </tbody>
                            </table>
                            {/* <div
                                class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                                <span class="text-xs xs:text-sm text-gray-900">
                                    Showing 1 to 4 of 50 Entries
                                </span>
                                <div class="inline-flex mt-2 xs:mt-0">
                                    <button
                                        class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                                        Prev
                                    </button>
                                    <button
                                        class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
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
