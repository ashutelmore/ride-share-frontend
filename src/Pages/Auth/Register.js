
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { register } from '../../App/Api'
import { useAuth } from '../../providers/auth'
import { useNotify } from '../../Helper/Notify'
import { validatePassword } from '../../Helper/helper'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confiPass, setConfiPass] = useState('')
    const [error, setError] = useState('Please enter your details.')
    const [showNotification, contextHolder] = useNotify()
    const auth = useAuth()

    async function fetchData(e) {
        e.preventDefault()

        if (!validatePassword(password)) {
            showNotification("Please use strong password")
            return
        }
        if (password !== confiPass) {
            showNotification("Password does not match")
            return
        }
        auth.setLoading(true)
        const res = await register({
            name, email, password
        });
        console.log(res)
        if (res.error) {
            //error
            showNotification(res.error.errMessage)
            auth.setLoading(false)
        } else if (res.payload) {
            auth.setUser(res.payload)
            localStorage.setItem('_id', res.payload._id)
            auth.setLoading(false)
        }
    }

    console.log('auth', auth)

    return (
        <>
            <form onSubmit={(e) => fetchData(e)}>

                {contextHolder}
                <div className="space-y-12 w-3/4 sm:px-4 mx-auto h-screen">
                    <div className="border-b border-gray-900/10 pb-12">
                        <header className="bg-white shadow">
                            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Register</h1>
                                {/* <h2 className="text-base font-semibold leading-7 text-gray-900">This information will be displayed publicly so be careful what you share.</h2> */}
                            </div>
                        </header>

                    </div>
                    <div className=" pb-12">
                        <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <p className="mt-3 text-sm text-left leading-6 text-gray-600">Required.</p>

                            </div>
                            <div className="sm:col-span-3">
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
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <p className="mt-3 text-sm text-left leading-6 text-gray-600">Required.</p>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="password"
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <p className="mt-3 text-sm text-left leading-6 text-gray-600">Use strong password.</p>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirm Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="password"
                                        name="last-name"
                                        id="last-name"
                                        autoComplete="family-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={confiPass}
                                        onChange={(e) => setConfiPass(e.target.value)}
                                    />
                                </div>
                                <p className="mt-3 text-sm text-left leading-6 text-gray-600">Use strong password.</p>
                            </div>
                            <div className="sm:col-span-3">
                                <div className="mt-6 flex items-center justify-start gap-x-6 mb-14">
                                    <Link to={'/login'} type="button" className="text-2xl font-semibold leading-6 text-gray-900">
                                        Login
                                    </Link>
                                    {
                                        auth.loading ?
                                            <button
                                                disabled={true}
                                                type="submit"
                                                className="rounded-md cursor-progress bg-indigo-600 px-3 py-2 text-2xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                loading...
                                            </button>
                                            :
                                            <button
                                                type="submit"
                                                className="rounded-md bg-indigo-600 px-3 py-2 text-2xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            // onClick={() => fetchData()}

                                            >
                                                Register
                                            </button>
                                    }

                                </div>
                            </div>

                        </div>
                    </div>

                </div>


            </form>
        </>
    )
}
