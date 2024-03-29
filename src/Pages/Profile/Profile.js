
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useAuth } from '../../providers/auth'
import { getUser, updateUser } from '../../App/Api'
import { useNotify } from '../../Helper/Notify'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { isEmptyObj, isEmptyObject, validateMobileNumber } from '../../Helper/helper'

export default function Profile() {
    const auth = useAuth()
    const [showNotification, contextHolder] = useNotify()
    const [userData, setUserData] = useState({})
    const [loader, setLoader] = useState({
        user: false,
    })

    const params = useParams()
    console.log('auth', auth)
    const onDetailsSave = async (e) => {
        e.preventDefault()

        let emptyFields = isEmptyObject(userData, ['profilePhoto', 'DOB']);
        let emptyFieldsAddress = isEmptyObject(userData.address);
        console.log('userData', userData)
        console.log('emptyFields', emptyFields)

        if (emptyFields.length > 0 || emptyFieldsAddress.length > 0) {
            showNotification('Field should not be empty')
            return
        }

        if (!validateMobileNumber(userData.phoneNumber)) {
            showNotification('Please enter valid number')
            return
        }

        if (!params.id)
            auth.setUser(userData)
        setLoader({ ...loader, user: true })
        const res = await updateUser(userData);
        console.log('res', res)
        if (res.error) {
            setLoader({ ...loader, user: false })
            showNotification(res.error.errMessage)
            // setErr(res.error.errMessage)
        } else if (res.payload) {
            setLoader({ ...loader, user: false })
            showNotification("Profile Updated successfully")
        }
    };

    useEffect(() => {
        if (params.id) {
            const fetchData = async (id) => {
                // setLoader({ ...loader, vehicle: true })
                const res = await getUser(id)
                if (res.error) {
                    showNotification(res.error.errMessage)
                    // setLoader({ ...loader, vehicle: false })

                } else if (res.payload) {
                    setUserData(res.payload)
                    // showNotification(res.message)
                    // setLoader({ ...loader, vehicle: false })
                }
            };
            // if (vehicles.length <= 0)
            fetchData(params.id)

        }
        else {

            setUserData(auth.user)
        }

    }, [auth.user, params])

    console.log('userData', userData)
    if (!userData._id)
        return null

    return (
        <form onSubmit={(e) => onDetailsSave(e)}>
            {contextHolder}
            <div className="space-y-12 w-3/4 sm:px-4 mx-auto">
                <div className="border-b border-gray-900/10 pb-12">
                    <header className="bg-white shadow">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Profile</h1>
                            <h2 className="text-base font-semibold leading-7 text-gray-900">This information will be displayed publicly so be careful what you share.</h2>
                        </div>
                    </header>

                </div>
                <div className=" pb-12">
                    <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    // autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={userData.name}
                                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                />
                            </div>
                            <p className="mt-3 text-sm text-left leading-6 text-gray-600">Required.</p>
                        </div>
                        {
                            auth.user.role == 'admin'
                            &&
                            <div className="col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Role
                                </label>
                                <select
                                    id="type"
                                    name="type"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={userData.role}
                                    onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                                >
                                    <option value={'admin'}>admin</option>
                                    <option value={'common'}>common</option>
                                </select>
                                <p className="mt-3 text-sm leading-6 text-left text-gray-600">Required</p>
                            </div>
                        }
                        <div className="col-span-full">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={userData.email}
                                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                />
                            </div>
                            <p className="mt-3 text-sm text-left leading-6 text-gray-600">Required.</p>
                        </div>

                        {/* <div className="sm:col-span-3">
                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                Country
                            </label>
                            <div className="mt-2">
                                <select
                                    id="country"
                                    name="country"
                                    autoComplete="country-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option>United States</option>
                                    <option>Canada</option>
                                    <option>Mexico</option>
                                </select>
                            </div>
                        </div> */}

                        <div className="col-span-3">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Update Password
                            </label>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    autoComplete="password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={userData.password}
                                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="col-span-3">
                            <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                Street address
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="street-address"
                                    id="street-address"
                                    autoComplete="street-address"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={userData.address.streetAdd}
                                    onChange={(e) => setUserData({ ...userData, address: { ...userData.address, streetAdd: e.target.value } })}
                                />
                            </div>
                            <p className="mt-3 text-sm text-left leading-6 text-gray-600">Required.</p>
                        </div>

                        <div className="col-span-2 sm:col-start-1">
                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                City
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    autoComplete="address-level2"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={userData.address.city}
                                    onChange={(e) => setUserData({ ...userData, address: { ...userData.address, city: e.target.value } })}
                                />
                            </div>
                            <p className="mt-3 text-sm text-left leading-6 text-gray-600">Required.</p>
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                State / Province
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="region"
                                    id="region"
                                    autoComplete="address-level1"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={userData.address.state}
                                    onChange={(e) => setUserData({ ...userData, address: { ...userData.address, state: e.target.value } })}
                                />
                            </div>
                            <p className="mt-3 text-sm text-left leading-6 text-gray-600">Required.</p>
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                ZIP / Postal code
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="postal-code"
                                    id="postal-code"
                                    autoComplete="postal-code"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={userData.address.pin}
                                    onChange={(e) => setUserData({ ...userData, address: { ...userData.address, pin: e.target.value } })}
                                />
                            </div>
                            <p className="mt-3 text-sm text-left leading-6 text-gray-600">Required.</p>
                        </div>

                        <div className="col-span-3">
                            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                Contact number
                            </label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    name="postal-code"
                                    id="postal-code"
                                    autoComplete="postal-code"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={userData.phoneNumber}
                                    onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
                                />
                            </div>
                            <p className="mt-3 text-sm text-left leading-6 text-gray-600">Required.</p>
                        </div>
                        <div className="col-span-3">
                            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                Date of Birth
                            </label>
                            <div className="mt-2">
                                <input
                                    type="date"
                                    name="postal-code"
                                    id="postal-code"
                                    autoComplete="postal-code"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={userData.DOB}
                                    onChange={(e) => setUserData({ ...userData, DOB: e.target.value })}
                                />
                            </div>
                            {/* <p className="mt-3 text-sm text-left leading-6 text-gray-600">Required.</p> */}
                        </div>
                        <div className="col-span-full space-y-10 w-[200px]">

                            <legend className="text-sm font-semibold leading-6 text-gray-900">Gender</legend>
                            {/* <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p> */}
                            <div className="mt-6 space-y-6">
                                <div className="flex items-center gap-x-3 w-1/3">
                                    <input
                                        id="push-everything"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        checked={userData.gender === 'male'}
                                        value={'male'}
                                        onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                                    />
                                    <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                        Male
                                    </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="push-email"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        checked={userData.gender === 'female'}
                                        value={'female'}
                                        onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                                    />
                                    <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Female
                                    </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <div className="mt-6 flex items-center justify-start gap-x-6 mb-14">
                                        {/* <button type="button" className="text-2xl font-semibold leading-6 text-gray-900">
                    Cancel
                </button> */}
                                        <button
                                            type="submit"
                                            className="rounded-md bg-indigo-600 px-3 py-2 text-2xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </form>
    )
}
