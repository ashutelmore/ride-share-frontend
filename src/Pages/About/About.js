const people = [
    {
        name: 'Aryan Mahadure',
        role: 'student',
        imageUrl:
            'https://images.unsplash.com/photo-1522609925277-66fea332c575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80"',
    },
    {
        name: 'User Name',
        role: 'student',
        imageUrl:
            'https://images.unsplash.com/photo-1522609925277-66fea332c575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80"',
    },
    {
        name: 'User Name',
        role: 'student',
        imageUrl:
            'https://images.unsplash.com/photo-1522609925277-66fea332c575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80"',
    },
    {
        name: 'User Name',
        role: 'student',
        imageUrl:
            'https://images.unsplash.com/photo-1522609925277-66fea332c575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80"',
    },
    // More people...
]

export default function About() {
    return (
        <div className="bg-white py-24 sm:py-32 h-screen">
            <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3 ">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight text-left text-gray-900 sm:text-4xl">Get in touch with us</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Head Office - Bangalore
                        iDisha Info labs pvt ltd
                        19, KMJ Aven, 2nd Floor,
                        Aswath Nagar, Outer Ring Rd,
                        above Avant Grade - Motoplex,
                        Marathahalli, Bengaluru,
                        Karnataka 560037

                        Call us at
                        080468 10628
                    </p>
                </div>
                <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                    {people.map((person) => (
                        <li key={person.name}>
                            <div className="flex items-center gap-x-6">
                                <img className="h-16 w-16 rounded-full" src={person.imageUrl} alt="" />
                                <div>
                                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                                    <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
