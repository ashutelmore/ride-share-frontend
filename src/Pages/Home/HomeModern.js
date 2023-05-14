import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import Testimonials from './Testimonials'
import Mumbai from './../../assets/Mumbai.png'
import bike from './../../assets/bike1.png'
import car1 from './../../assets/car1.png'
import logogg from './../../assets/logogg.png'
import moped from './../../assets/moped.1.png'
import bg from './../../assets/bg.jpg'
import { Link } from 'react-router-dom'
const features = [
    {
        name: 'Ride Sharing',
        description:
            'Get Matched With Other Riders Heading In The Same Direction And Split The Cost Of The Trip.',
        icon: CloudArrowUpIcon,
    },
    {
        name: 'Car Pooling',
        description:
            'Share A Ride With Other Passengers And Reduce Traffic Congestion And Your Carbon Footprint.',
        icon: LockClosedIcon,
    },
    {
        name: 'On-Demand Rides',
        description:
            'Hail A Ride Instantly And Get Picked Up By A Nearby Driver At Any Time Of Day Or Night.',
        icon: ArrowPathIcon,
    }
]

export default function HomeModern() {
    return (
        <>
            <div className="relative overflow-hidden bg-white">
                <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
                    <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                        <div className="sm:max-w-lg">
                            <h1 className="font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                Book Your Ride Now
                            </h1>
                            <p className="mt-4 text-xl text-gray-500">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla architecto commodi nesciunt fuga, natus tem
                            </p>
                        </div>
                        <div>
                            <div className="mt-10">
                                {/* Decorative image grid */}
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                                >
                                    <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                                        <div className="flex items-center space-x-6 lg:space-x-8">
                                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                                                    <img
                                                        src={moped}
                                                        alt=""
                                                        className="h-full w-full object-contain object-center"
                                                    />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        src={bike}
                                                        alt=""
                                                        className="h-full w-full object-contain object-center"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        src={car1}
                                                        alt=""
                                                        className="h-full w-full object-contain object-center"
                                                    />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        src={bg}
                                                        alt=""
                                                        className="h-full w-full object-contain object-center"
                                                    />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        src={logogg}
                                                        alt=""
                                                        className="h-full w-full object-contain object-center"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    to={'/SearchRide'}
                                    className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                                >
                                    Book Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-indigo-600">Something heading</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla architecto commodi nesciunt fuga, natus tem
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
                            {features.map((feature) => (
                                <div key={feature.name} className="relative pl-16">
                                    <dt className="text-base font-semibold leading-7 text-gray-900">
                                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                            <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
            <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
                <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
                <div className="mx-auto max-w-2xl lg:max-w-4xl">
                    {/* <img className="mx-auto h-12" src="https://tailwindui.com/img/logos/workcation-logo-indigo-600.svg" alt="" /> */}
                    <figure className="mt-10">
                        <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                            <p>
                                “Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias
                                molestiae. Numquam corrupti in laborum sed rerum et corporis.”
                            </p>
                        </blockquote>
                        <figcaption className="mt-10">
                            <img
                                className="mx-auto h-10 w-10 rounded-full"
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />
                            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                                <div className="font-semibold text-gray-900">Dhiraj Pahuja</div>
                                <svg viewBox="0 0 2 2" width={3} height={3} aria-hidden="true" className="fill-gray-900">
                                    <circle cx={1} cy={1} r={1} />
                                </svg>
                                <div className="text-gray-600">Student</div>
                            </div>
                        </figcaption>
                    </figure>
                </div>
            </section>
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
                        We Are Best In The City
                    </h2>
                    <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                        <img
                            className="col-span-2 max-h-28 w-full object-contain lg:col-span-1"
                            src={Mumbai}
                            alt="Transistor"
                            width={158 * 2}
                            height={48 * 2}
                        />
                        <img
                            className="col-span-2 max-h-28 w-full object-contain lg:col-span-1"
                            src={Mumbai}
                            alt="Transistor"
                            width={158 * 2}
                            height={48 * 2}
                        />
                        <img
                            className="col-span-2 max-h-28 w-full object-contain lg:col-span-1"
                            src={Mumbai}
                            alt="Transistor"
                            width={158 * 2}
                            height={48 * 2}
                        />
                        <img
                            className="col-span-2 max-h-28 w-full object-contain lg:col-span-1"
                            src={Mumbai}
                            alt="Transistor"
                            width={158 * 2}
                            height={48 * 2}
                        />
                        <img
                            className="col-span-2 max-h-28 w-full object-contain lg:col-span-1"
                            src={Mumbai}
                            alt="Transistor"
                            width={158 * 2}
                            height={48 * 2}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
