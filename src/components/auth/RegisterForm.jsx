'use client'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Loader from '../loaders/Loader'
import { toast } from 'react-hot-toast'

const RegisterForm = () => {

    const { status } = useSession()
    const router = useRouter()
    const [data, setData] = useState({ name: '', email: '', password: '', otp: '' })
    const [loading, setLoading] = useState(false)
    const [emailLoading, setEmailLoading] = useState(false)

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/')
        }
    }, [status])

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            if (data.password.length < 6) {
                return toast.error('password must contains 6 char.')
            }
            setLoading(true)
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify(data)
            })
            response && setLoading(false)
            const responseData = await response.json();
            if (responseData?.success) {
                toast.success(responseData.message)
                router.push('/login')
            } else {
                toast.success(responseData.message)
            }
        } catch (error) {
            setLoading(false)
            toast.error('something went wrong.')
            console.log(error);
        }
    }

    const sendOtp = async () => {
        try {
            if (!data?.email) {
                return toast.error('Enter email first.')
            }
            setEmailLoading(true)
            const response = await fetch(`/api/otp`, {
                method: 'POST',
                body: JSON.stringify({ email: data.email, subject: 'Email verification' })
            })
            const responseData = await response.json()
            setEmailLoading(false)
            if (responseData?.success) {
                toast.success(responseData?.message)
            } else {
                toast.error('something went wrong.')
            }
        } catch (error) {
            setEmailLoading(false)
            toast.error('something went wrong.')
            console.log(error);
        }
    }

    return (
        <div>
            {
                status === 'loading' ?
                    (
                        <Loader />
                    )
                    :
                    (
                        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                    Register
                                </h2>
                            </div>
                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                <form onSubmit={(e) => handleRegister(e)} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Your name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                disabled={loading && true}
                                                id="name"
                                                name="name"
                                                type="name"
                                                placeholder='Enter your name.'
                                                autoComplete="name"
                                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                                required
                                                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                disabled={loading && true}
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder='Enter your email.'
                                                autoComplete="email"
                                                onChange={(e) => setData({ ...data, email: e.target.value })}
                                                required
                                                className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                                Password
                                            </label>
                                        </div>
                                        <div className="mt-2">
                                            <input
                                                disabled={loading && true}
                                                id="password"
                                                name="password"
                                                type="password"
                                                placeholder='Enter your password.'
                                                autoComplete="current-password"
                                                onChange={(e) => setData({ ...data, password: e.target.value })}
                                                required
                                                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {
                                            data?.password && data.password.length < 6 && <p className="text-xs text-red-500 mt-2">password must be 6 characters long.</p>
                                        }
                                    </div>

                                    <div className="flex items-center mb-2">
                                        <input
                                            type='number'
                                            placeholder="Enter OTP"
                                            required
                                            onChange={(e) => setData({ ...data, otp: e.target.value })}
                                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                                        />
                                        <div
                                            className="bg-green-500 text-white py-1 px-3 rounded-lg ml-2 transition-transform transform active:scale-95 cursor-pointer"
                                            onClick={() => emailLoading ? null : sendOtp()}
                                        >
                                            {emailLoading ? 'Sending..' : 'Send'}
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            disabled={loading && true}
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            {
                                                loading ? 'Registering..' : ' Register'
                                            }
                                        </button>
                                    </div>
                                    <div>
                                        <button onClick={() => signIn('google')} type="button" className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                                            <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                                            Sign up with Google
                                            <div>
                                            </div>
                                        </button>
                                    </div>
                                </form>

                                <p className="mt-10 text-center text-sm text-gray-500">
                                    Already a member?{' '}
                                    <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </div>
                        // <section>
                        //     <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                        //         <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                        //             <h2 className="text-center text-2xl font-bold leading-tight text-black">
                        //                 Sign up
                        //             </h2>
                        //             <p className="mt-2 text-center text-base text-gray-600">
                        //                 Already have an account?{' '}
                        //                 <a
                        //                     href="#"
                        //                     title=""
                        //                     className="font-medium text-black transition-all duration-200 hover:underline"
                        //                 >
                        //                     Sign In
                        //                 </a>
                        //             </p>
                        //             <form action="#" method="POST" className="mt-8">
                        //                 <div className="space-y-5">
                        //                     <div>
                        //                         <label htmlFor="name" className="text-base font-medium text-gray-900">
                        //                             {' '}
                        //                             Full Name{' '}
                        //                         </label>
                        //                         <div className="mt-2">
                        //                             <input
                        //                                 className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        //                                 type="text"
                        //                                 placeholder="Full Name"
                        //                                 id="name"
                        //                             ></input>
                        //                         </div>
                        //                     </div>
                        //                     <div>
                        //                         <label htmlFor="email" className="text-base font-medium text-gray-900">
                        //                             {' '}
                        //                             Email address{' '}
                        //                         </label>
                        //                         <div className="mt-2">
                        //                             <input
                        //                                 className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        //                                 type="email"
                        //                                 placeholder="Email"
                        //                                 id="email"
                        //                             ></input>
                        //                         </div>
                        //                     </div>
                        //                     <div>
                        //                         <div className="flex items-center justify-between">
                        //                             <label htmlFor="password" className="text-base font-medium text-gray-900">
                        //                                 {' '}
                        //                                 Password{' '}
                        //                             </label>
                        //                         </div>
                        //                         <div className="mt-2">
                        //                             <input
                        //                                 className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        //                                 type="password"
                        //                                 placeholder="Password"
                        //                                 id="password"
                        //                             ></input>
                        //                         </div>
                        //                     </div>
                        //                     <div>
                        //                         <button
                        //                             type="button"
                        //                             className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                        //                         >
                        //                             Create Account
                        //                         </button>
                        //                     </div>
                        //                 </div>
                        //             </form>
                        //             <div className="mt-3 space-y-3">
                        //                 <button
                        //                     type="button"
                        //                     className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                        //                 >
                        //                     <span className="mr-2 inline-block">
                        //                         <svg
                        //                             className="h-6 w-6 text-rose-500"
                        //                             xmlns="http://www.w3.org/2000/svg"
                        //                             viewBox="0 0 24 24"
                        //                             fill="currentColor"
                        //                         >
                        //                             <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                        //                         </svg>
                        //                     </span>
                        //                     Sign up with Google
                        //                 </button>
                        //             </div>
                        //         </div>
                        //     </div>
                        // </section>
                    )
            }
        </div>
    )
}

export default RegisterForm