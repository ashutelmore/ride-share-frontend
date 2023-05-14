
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import { isEmptyField, isEmptyObject } from '../../Helper/helper';
import { useNotify } from '../../Helper/Notify';
import { createVehicles, getVehicles, updateVehicles } from '../../App/VehicleApi';
import { useAuth } from '../../providers/auth';
import { json, useParams } from 'react-router-dom';

export default function AddVehicle() {
    const [showNotification, contextHolder] = useNotify()
    const params = useParams()
    const [loader, setLoader] = useState({
        vehicle: false
    })
    const auth = useAuth()


    const [vehicle, setVehicle] = useState({
        isAvailableForBook: null,
        vehicleName: '',
        type: '',
        sits: '',
        pricePerKm: '',
        vehicleNumber: '',
        descp: '',
        polices: {
            isLicense: null,
            isInsurance: null,
        },
        image: {
            data: [],
            contentType: ''
        }
    })
    const [vehicleImg, setVehicleImg] = useState()
    const [vehicleImgPreview, setvehicleImgPreview] = useState()

    const bufferToImage = (bufferData) => {
        return `data:${bufferData.image.contentType};base64, ${Buffer.from(bufferData.image.data.data).toString('base64')}`
    };
    console.log(vehicle)
    const onHandleSaveVehicle = async (e) => {
        e.preventDefault()
        setLoader({ ...loader, vehicle: true })
        const emptObjList = isEmptyObject(vehicle)
        // const isEmpty = isEmptyField(vehicle.polices.isLicense, vehicle.polices.isInsurance)

        if (emptObjList.length > 0) {
            showNotification("any Input filed should not empty")
            setLoader({ ...loader, vehicle: false })
            return
        }

        if (vehicle._id) {
            updateVehiclesDetails()
            return
        }

        const data = {
            ...vehicle,
            driverId: auth.user._id,
        }
        let formData = new FormData()
        formData.append('payload', JSON.stringify(data))
        formData.append('vehicleImg', vehicleImg)

        const res = await createVehicles(formData)
        if (res.error) {
            showNotification(res.error.errMessage)
            setLoader({ ...loader, vehicle: false })

        } else if (res.payload) {
            showNotification(res.message)
            setLoader({ ...loader, vehicle: false })
        }
    };
    const updateVehiclesDetails = async () => {
        const data = {
            ...vehicle,
        }
        let formData = new FormData()
        formData.append('payload', JSON.stringify(data))
        formData.append('vehicleImg', vehicleImg)
        const res = await updateVehicles(vehicle._id, formData)
        if (res.error) {
            showNotification(res.error.errMessage)
            setLoader({ ...loader, vehicle: false })

        } else if (res.payload) {
            showNotification(res.message)
            setLoader({ ...loader, vehicle: false })
        }
    };

    //fetch one vehicle data
    useEffect(() => {
        const fetchData = async (id) => {
            setLoader({ ...loader, vehicle: true })
            const res = await getVehicles({ vehicleId: id })
            if (res.error) {
                showNotification(res.error.errMessage)
                setLoader({ ...loader, vehicle: false })
            } else if (res.payload) {
                setVehicle(res.payload[0])
                showNotification(res.message)
                setLoader({ ...loader, vehicle: false })
            }
        };
        if (params.id)
            fetchData(params.id)
    }, [])

    //preview vehicle image
    useEffect(() => {
        if (!vehicleImg) {
            setvehicleImgPreview(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(vehicleImg)
        setvehicleImgPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [vehicleImg])

    // console.log('vehicle', vehicle)
    return (
        <form onSubmit={onHandleSaveVehicle} enctype="multipart/form-data">
            {contextHolder}
            <div className="space-y-12 w-3/4 sm:px-4">
                <div className="border-b border-gray-900/10 pb-12">
                    <header className="bg-white shadow">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Add Your Vehicle</h1>
                            {/* <h2 className="text-base font-semibold leading-7 text-gray-900">This information will be displayed publicly so be careful what you share.</h2> */}
                        </div>
                    </header>

                </div>

                <div className=" pb-12">
                    <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-full">
                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                Allow to other user to book you vehicle
                            </label>
                            <div className="mt-2">
                                <select
                                    id="isAvailableForBook"
                                    name="isAvailableForBook"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    value={vehicle.isAvailableForBook}
                                    onChange={(e) => setVehicle({ ...vehicle, isAvailableForBook: e.target.value })}
                                >
                                    <option value={''}>Select Option</option>
                                    <option value={'true'}>Yes</option>
                                    <option value={'false'}>No</option>
                                </select>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                Type vehicle
                            </label>
                            <div className="mt-2">
                                <select
                                    id="type"
                                    name="type"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    value={vehicle.type}
                                    onChange={(e) => setVehicle({ ...vehicle, type: e.target.value })}
                                >
                                    <option value={''}>Select Option</option>
                                    <option value={'2 weeler'}>2 weeler</option>
                                    <option value={'3 weeler'}>3 weeler</option>
                                    <option value={'4 weeler'}>4 weeler</option>
                                </select>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="vehicleName" className="block text-sm font-medium leading-6 text-gray-900">
                                Vehicle name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="vehicleName"
                                    id="vehicleName"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={vehicle.vehicleName}
                                    onChange={(e) => setVehicle({ ...vehicle, vehicleName: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="vehicleNumber" className="block text-sm font-medium leading-6 text-gray-900">
                                Vehicle Number
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="vehicleNumber"
                                    id="vehicleNumber"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={vehicle.vehicleNumber}
                                    onChange={(e) => setVehicle({ ...vehicle, vehicleNumber: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="sits" className="block text-sm font-medium leading-6 text-gray-900">
                                Numbers of sits available
                            </label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    name="sits"
                                    id="sits"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={vehicle.sits}
                                    onChange={(e) => setVehicle({ ...vehicle, sits: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3 ">
                            <label htmlFor="pricePerKm" className="block text-sm font-medium leading-6 text-gray-900">
                                Price per KM
                            </label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    name="pricePerKm"
                                    id="pricePerKm"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={vehicle.pricePerKm}
                                    onChange={(e) => setVehicle({ ...vehicle, pricePerKm: e.target.value })}
                                />
                            </div>
                        </div>

                    </div>
                    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                            <label htmlFor="descp" className="block text-sm font-medium leading-6 text-gray-900">
                                Notes
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="descp"
                                    name="descp"
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={vehicle.descp}
                                    onChange={(e) => setVehicle({ ...vehicle, descp: e.target.value })}
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about your ride.</p>
                        </div>

                    </div>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3 ">
                            <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                    <input
                                        id="isLicense"
                                        name="isLicense"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        checked={vehicle.polices.isLicense}
                                        onChange={(e) => setVehicle({ ...vehicle, polices: { ...vehicle.polices, isLicense: e.target.checked } })}
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="isLicense" className="font-medium text-gray-900">
                                        Have licence
                                    </label>
                                    <p className="text-gray-500">Checked if you have a licence .</p>
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-3 ">
                            <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                    <input
                                        id="isInsurance"
                                        name="isInsurance"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        checked={vehicle.polices.isInsurance}
                                        onChange={(e) => setVehicle({ ...vehicle, polices: { ...vehicle.polices, isInsurance: e.target.checked } })}
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="isInsurance" className="font-medium text-gray-900">
                                        Has insurance

                                    </label>
                                    <p className="text-gray-500">Checked if you have a insurance .</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-3">
                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                Vehicle Image
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-2 py-4">
                                <div className="text-center">
                                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label
                                            htmlFor="vehicleImg"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>Upload a file</span>
                                            <input
                                                id="vehicleImg"
                                                name="vehicleImg"
                                                type="file"
                                                className="sr-only"
                                                onChange={(e) => setVehicleImg(e.target.files[0])}
                                            // onChange={(e) => setVehicleImg(URL.createObjectURL(e.target.files[0]))}
                                            />
                                        </label>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-span-3">
                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                Uploaded Vehicle Image
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-2 py-4">
                                <div className="text-center">
                                    <div class="flex-shrink-0 w-50 h-50">
                                        {
                                            vehicleImgPreview ?
                                                <img class="w-full h-full "
                                                    // src={vehicle._id && bufferToImage(vehicle)}
                                                    src={vehicleImgPreview}
                                                    alt="" />
                                                :
                                                <img class="w-full h-full "
                                                    src={vehicle._id && bufferToImage(vehicle)}
                                                    alt="" />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="mt-6 flex items-center justify-start gap-x-6 mb-14">
                        {/* <button type="button" className="text-2xl font-semibold leading-6 text-gray-900">
                    Cancel
                </button> */}
                        {
                            loader.vehicle ?
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

            </div >



        </form >
    )
}
