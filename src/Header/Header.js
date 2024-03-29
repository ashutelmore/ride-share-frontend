import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, NavLink } from 'react-router-dom'
import logogg from './../assets/logogg.png'

import { useAuth } from '../providers/auth'

const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {
    const auth = useAuth()

    let navigation = [
        { name: 'Book Ride', href: '/SearchRide', current: true },
        { name: 'Home', href: '/', current: false },
        { name: 'About', href: '/about', current: false },
    ]

    if (auth.user._id && auth.user.role === 'admin') {
        navigation = [
            { name: 'Book Ride', href: '/SearchRide', current: true },
            { name: 'Home', href: '/', current: false },
            { name: 'About', href: '/about', current: false },
            { name: 'Rides', href: '/rides', current: false },
            { name: 'Customer', href: '/customer', current: false },
            { name: 'Bookings', href: '/booking', current: false },
            { name: 'Vehicle', href: '/vehicles', current: false },
        ]
    } else if (auth.user._id) {
        navigation = [
            { name: 'Book Ride', href: '/SearchRide', current: true },
            { name: 'Home', href: '/', current: false },
            { name: 'About', href: '/about', current: false },
            { name: 'Post Ride/Vehicle', href: '/postride', current: false },
            { name: 'Rides', href: '/rides', current: false },
            { name: 'Bookings', href: '/booking', current: false },
            { name: 'Vehicle', href: '/vehicles', current: false },
            { name: 'Add Vehicle', href: '/postvehicle', current: false },
        ]
    }


    const userNavigation = [
        { name: 'Your Profile', href: '/profile' },
        { name: 'Sign out', href: '#' },
    ]


    const logout = () => {
        localStorage.removeItem('_id');
        auth.setUser({})
    };



    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-gray-800">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-8 w-8"
                                                src={logogg}
                                                alt="Your Company"
                                            />
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="ml-10 flex items-baseline space-x-4">
                                                {navigation.map((item) => (
                                                    <NavLink
                                                        key={item.name}
                                                        to={item.href}
                                                        className={classNames(
                                                            item.current
                                                                ? 'bg-gray-900 text-white'
                                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                            'rounded-md px-3 py-2 text-sm font-medium'
                                                        )}
                                                        aria-current={item.current ? 'page' : undefined}
                                                    >
                                                        {item.name}
                                                    </NavLink>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            <button
                                                type="button"
                                                className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                            >
                                                {/* <span className="sr-only">View notifications</span>
                                                <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                                            </button>

                                            {/* Profile dropdown */}
                                            <Menu as="div" className="relative ml-3">
                                                <div>
                                                    {
                                                        !auth.user._id ?
                                                            <>
                                                                <Link
                                                                    // key={item.name}
                                                                    to={'/register'}
                                                                    className={classNames(' text-gray-300  text-white',
                                                                        'rounded-md px-3 py-2 text-sm font-medium '
                                                                    )}
                                                                >
                                                                    Register
                                                                </Link>
                                                                <Link
                                                                    // key={item.name}
                                                                    to={'/login'}
                                                                    className={classNames(' text-gray-300 bg-gray-700 text-white',
                                                                        'rounded-md px-3 py-2 text-sm font-medium '
                                                                    )}
                                                                >
                                                                    Login
                                                                </Link>
                                                            </>
                                                            :
                                                            <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none ">
                                                                <span className="sr-only">Open user menu</span>
                                                                <button
                                                                    // key={item.name}
                                                                    // to={item.href}
                                                                    className={classNames(' text-gray-300 bg-gray-700 text-white',
                                                                        'rounded-md px-3 py-2 text-sm font-medium '
                                                                    )}
                                                                >
                                                                    {auth.user.name}
                                                                </button>
                                                            </Menu.Button>
                                                    }
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >


                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <Menu.Item >
                                                            <Link
                                                                to='/profile'
                                                                className={classNames(
                                                                    'block px-4 py-2 text-sm text-gray-700'
                                                                )}
                                                            >
                                                                Profile
                                                            </Link>
                                                        </Menu.Item>
                                                        <Menu.Item >
                                                            <button
                                                                to='/profile'
                                                                className={classNames(
                                                                    'block px-4 py-2 text-sm text-gray-700'
                                                                )}
                                                                onClick={logout}
                                                            >
                                                                Logout
                                                            </button>
                                                        </Menu.Item>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                    {navigation.map((item) => (
                                        <NavLink
                                            key={item.name}
                                            to={item.href}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            <Disclosure.Button
                                                // onClick={() => close()}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'block rounded-md px-3 py-2 text-base font-medium'
                                                )}
                                            // aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Disclosure.Button>
                                        </NavLink>
                                    ))}
                                </div>
                                <div className="border-t border-gray-700 pb-3 pt-4">
                                    <div className="flex items-center px-5">
                                        {
                                            !auth.user._id ?
                                                <>
                                                    <Link
                                                        // key={item.name}
                                                        to={'/register'}
                                                        className={classNames(' text-gray-300  text-white',
                                                            'rounded-md px-3 py-2 text-sm font-medium '
                                                        )}
                                                    >
                                                        <Disclosure.Button
                                                            className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white"

                                                        >

                                                            Register
                                                        </Disclosure.Button>
                                                    </Link>
                                                    <Link
                                                        // key={item.name}
                                                        to={'/login'}
                                                        className={classNames(' text-gray-300 bg-gray-700 text-white',
                                                            'rounded-md px-3 py-2 text-sm font-medium '
                                                        )}
                                                    >
                                                        <Disclosure.Button
                                                            className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white"
                                                        >

                                                            Login
                                                        </Disclosure.Button>
                                                    </Link>
                                                </>
                                                :
                                                <Menu>

                                                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none ">
                                                        <span className="sr-only">Open user menu</span>
                                                        <button
                                                            // key={item.name}
                                                            // to={item.href}
                                                            className={classNames(' text-gray-300 bg-gray-700 text-white',
                                                                'rounded-md px-3 py-2 text-sm font-medium '
                                                            )}
                                                        >
                                                            {auth.user.name}
                                                        </button>
                                                    </Menu.Button>
                                                </Menu>
                                        }
                                    </div>
                                    {
                                        auth.user._id &&
                                        <div className="mt-3 space-y-1 px-2">
                                            <Link
                                                to={'/profile'}
                                                className={classNames(
                                                    'block px-4 py-2 text-sm text-gray-700'
                                                )}
                                            >
                                                <Disclosure.Button
                                                    // key={item.name}
                                                    as="Link"
                                                    to={'/profile'}
                                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                                >
                                                    Profile
                                                </Disclosure.Button>
                                            </Link>
                                            <button
                                                className={classNames(
                                                    'block px-4 py-2 text-sm text-gray-700'
                                                )}
                                                onClick={logout}
                                            >
                                                <Disclosure.Button
                                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                                >
                                                    Logout
                                                </Disclosure.Button>
                                            </button>
                                        </div>
                                    }
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>
        </>
    )
}
