import React from 'react'
import logogg from './../assets/logogg.png'
import { Link } from 'react-router-dom'


export default function Footer() {
    return (
        <>
            <div className=" mx-auto w-full  relative z-50">

                <footer className="p-4  bg-gray-800 rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-800">
                    <div className="sm:flex sm:items-center sm:justify-between space-y-12 w-3/4 sm:px-4 mx-auto">
                        <Link to={'/notfound'} target="_blank" className="flex items-center mb-4 sm:mb-0">
                            <img src={logogg} className="mr-4 h-8" alt="Flowbite Logo" />
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">EzyRidez</span>
                        </Link>
                        <ul className="flex flex-wrap items-center mb-6 sm:mb-0">
                            <li>
                                <Link to={'/about'} className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">About</Link>
                            </li>
                            {/* <li>
                                <Link to={'/notfound'} className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Privacy
                                    Policy</Link>
                            </li>
                            <li>
                                <Link to={'/notfound'}
                                    className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Licensing</Link>
                            </li> */}
                            <li>
                                <Link to={'/about'} className="text-sm text-gray-500 hover:underline dark:text-gray-400">Contact</Link>
                            </li>
                        </ul>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023
                        <a href="/" target="_blank" className="hover:underline">EzyRidez</a>. All Rights Reserved.
                    </span>
                </footer>
            </div>
        </>
    )
}
