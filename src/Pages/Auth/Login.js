
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { forgetPassword, login } from '../../App/Api'
import { useAuth } from '../../providers/auth'
import { useNotify } from '../../Helper/Notify'

export default function Login() {

    const navaigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [showNotification, contextHolder] = useNotify()
    const [loader, setLoader] = useState({
        forgetPass: false,
    })

    const auth = useAuth()
    async function fetchData(e) {
        e.preventDefault()
        // return
        auth.setLoading(true)
        const res = await login({
            email, password
        });
        console.log('res', res)
        if (res.error) {
            //error
            showNotification(res.error.errMessage)
            auth.setLoading(false)
        } else if (res.payload) {
            auth.setUser(res.payload)
            auth.setLoading(false)
            showNotification(res.message)
            localStorage.setItem('_id', res.payload._id)
        }
    }
    async function onHandleforgetPassword(e) {
        if (email == '') {
            showNotification("Email field should not empty")
            return
        }
        // return
        // auth.setLoading(true)
        setLoader({ ...loader, forgetPass: true })
        const res = await forgetPassword({
            email
        });
        console.log('res', res)
        if (res.error) {
            //error
            showNotification(res.error.errMessage)
            setLoader({ ...loader, forgetPass: false })

            // auth.setLoading(false)
        } else if (res.payload) {
            // auth.setUser(res.payload)
            // auth.setLoading(false)
            showNotification(res.message)
            setLoader({ ...loader, forgetPass: false })

            // localStorage.setItem('_id', res.payload._id)
        }
    }
    console.log('auth', auth)

    return (
        <form onSubmit={(e) => fetchData(e)}>
            {contextHolder}
            <div className="space-y-12 w-3/4 sm:px-4 mx-auto">
                <div className="border-b border-gray-900/10 pb-12">
                    <header className="bg-white shadow">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Login</h1>

                        </div>
                    </header>
                    <h2 className="text-base font-semibold leading-7 text-red-900">{error}</h2>
                </div>
                <div className=" pb-12">

                    <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="sm:col-span-4">
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
                                    required
                                />
                            </div>
                            <p className="mt-3 text-sm text-left leading-6 text-gray-600">Required.</p>

                        </div>
                        <div className="sm:col-span-4">
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
                            {
                                loader.forgetPass ?
                                    <p className="mt-3 text-sm text-left leading-6 text-gray-600 cursor-pointer"
                                    >Loading...</p>
                                    :
                                    <p className="mt-3 text-sm text-left leading-6 text-gray-600 cursor-pointer"
                                        onClick={(e) => onHandleforgetPassword(e)}
                                    >Forget password.</p>
                            }
                        </div>
                        <div className="sm:col-span-4 gap-3">

                            <Link to={'/register'} className="text-2xl font-semibold leading-6 text-gray-900 mr-3">
                                Register
                            </Link>

                            {
                                auth.loading ?
                                    <button
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-2xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        disabled={true}
                                    >
                                        loading...
                                    </button>
                                    :
                                    <>

                                        <button
                                            className="rounded-md bg-indigo-600 px-3 py-2 text-2xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            // onClick={() => fetchData()}
                                            type='submit'
                                        >
                                            Login
                                        </button>

                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
