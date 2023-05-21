import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../providers/auth";
import { resendVerification, verify } from "../../App/Api";
import { useNotify } from "../../Helper/Notify";
import { useEffect } from "react";

export default function VerifyEmail({
    heading = "Verify your mail id",
    descp = "",
    code = "404"
}) {
    const auth = useAuth()
    const [showNotification, contextHolder] = useNotify()
    const params = useParams()
    console.log('auth', auth)

    const resendVerifyMail = async (e) => {
        if (!auth.user._id) {
            showNotification("Please login again")
            return
        }
        auth.setLoading(true)
        const res = await resendVerification({ name: auth.user.name, email: auth.user.email })
        console.log('res', res)
        if (res.error) {
            //error
            showNotification(res.error.errMessage)
            auth.setLoading(false)
        } else if (res.payload) {
            // auth.setUser(res.payload)
            auth.setLoading(false)
            showNotification(res.message)
            // localStorage.setItem('_id', res.payload._id)
        }
    };

    useEffect(() => {
        const fetchData = async (params) => {
            auth.setLoading(true)
            const res = await verify({ email: params.email, token: params.token })
            console.log('res', res)
            if (res.error) {
                showNotification(res.error.errMessage)
                auth.setLoading(false)

            } else if (res.payload) {
                auth.setUser(res.payload)
                showNotification(res.message)
                auth.setLoading(false)
            }
        };
        if (params.email)
            fetchData(params)
    }, [])

    return (
        <>
            {contextHolder}
            <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">

                <div className="text-center">
                    <p className="text-base font-semibold text-indigo-600">{code}</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">{heading}</h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">We have send the Verification link on {auth.user.email}</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        {
                            auth.loading ?
                                <button
                                    className="rounded-md bg-indigo-300 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Loading...
                                </button>
                                :
                                <button
                                    to={'/'}
                                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={resendVerifyMail}
                                >
                                    Resend Verification link
                                </button>
                        }

                        {/* <a href="#" className="text-sm font-semibold text-gray-900">
                            Contact support <span aria-hidden="true">&rarr;</span>
                        </a> */}
                    </div>
                </div>
            </main>
        </>
    )
}
