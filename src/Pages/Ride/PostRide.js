/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

export default function PostRide() {
    return (
        <form>


            <div className="space-y-12 w-3/4 sm:px-4">
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
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Start Location
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                End Location
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    autoComplete="family-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Distance
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                Chose which vehicle
                            </label>
                            <div className="mt-2">
                                <select
                                    id="country"
                                    name="country"
                                    autoComplete="country-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option>Bike</option>
                                    <option>Car</option>
                                    <option>Truck</option>
                                </select>
                            </div>
                        </div>

                        {/* <div className="col-span-full">
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
                                />
                            </div>
                        </div> */}

                        <div className="sm:col-span-2 sm:col-start-1">
                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                Price per KM
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    autoComplete="address-level2"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                Start Journey Date
                            </label>
                            <div className="mt-2">
                                <input
                                    type="date"
                                    name="region"
                                    id="region"
                                    autoComplete="address-level1"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                End Journey Date
                            </label>
                            <div className="mt-2">
                                <input
                                    type="date"
                                    name="postal-code"
                                    id="postal-code"
                                    autoComplete="postal-code"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                Notes
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="about"
                                    name="about"
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about your ride.</p>
                        </div>

                    </div>

                    <div className="border-b border-gray-900/10 pb-12">

                        <div className="mt-10 space-y-10">
                            <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-gray-900">Permissions</legend>
                                <div className="mt-6 space-y-6">
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="comments"
                                                name="comments"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="comments" className="font-medium text-gray-900">
                                                Smoke
                                            </label>
                                            {/* <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p> */}
                                        </div>
                                    </div>
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="candidates"
                                                name="candidates"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="candidates" className="font-medium text-gray-900">
                                                Chat
                                            </label>
                                            {/* <p className="text-gray-500">Get notified when a candidate applies for a job.</p> */}
                                        </div>
                                    </div>
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="offers"
                                                name="offers"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="offers" className="font-medium text-gray-900">
                                                Food
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
                </div>



            </div>

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
        </form>
    )
}
