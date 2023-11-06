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
                        <section>
                            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                                    <h2 className="text-center text-2xl font-bold leading-tight text-black">
                                        Sign up
                                    </h2>
                                    <p className="mt-2 text-center text-base text-gray-600">
                                        Already have an account?{' '}
                                        <Link
                                            href="/login"
                                            className="font-medium text-black transition-all duration-200 hover:underline"
                                        >
                                            Sign In
                                        </Link>
                                    </p>
                                    <form onSubmit={(e) => handleRegister(e)} className="mt-8">
                                        <div className="space-y-5">
                                            <div>
                                                <label htmlFor="name" className="text-base font-medium text-gray-900">
                                                    {' '}
                                                    Full Name{' '}
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                        disabled={loading && true}
                                                        id="name"
                                                        name="name"
                                                        type="name"
                                                        placeholder='Enter your name.'
                                                        autoComplete="name"
                                                        onChange={(e) => setData({ ...data, name: e.target.value })}
                                                        required
                                                    ></input>
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="text-base font-medium text-gray-900">
                                                    {' '}
                                                    Email address{' '}
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                        disabled={loading && true}
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        placeholder='Enter your email.'
                                                        autoComplete="email"
                                                        onChange={(e) => setData({ ...data, email: e.target.value })}
                                                        required
                                                    ></input>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex items-center justify-between">
                                                    <label htmlFor="password" className="text-base font-medium text-gray-900">
                                                        {' '}
                                                        Password{' '}
                                                    </label>
                                                </div>
                                                <div className="mt-2">
                                                    <input
                                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                        disabled={loading && true}
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        placeholder='Enter your password.'
                                                        autoComplete="current-password"
                                                        onChange={(e) => setData({ ...data, password: e.target.value })}
                                                        required
                                                    ></input>
                                                </div>
                                            </div>
                                            {
                                                data?.password && data.password.length < 6 && <p className="text-xs text-red-500 mt-2">password must be 6 characters long.</p>
                                            }
                                            <div className="flex items-center mb-2">
                                                <input
                                                    type='number'
                                                    placeholder="Enter OTP"
                                                    required
                                                    onChange={(e) => setData({ ...data, otp: e.target.value })}
                                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                />
                                                <div
                                                    className="bg-black/80 hover:bg-black text-white py-1 px-3 rounded-lg ml-2 transition-transform transform active:scale-95 cursor-pointer"
                                                    onClick={() => emailLoading ? null : sendOtp()}
                                                >
                                                    {emailLoading ?
                                                        <div className="inline-block w-4 h-4 border-t-2 border-r-2 border-b-2 border-white rounded-full animate-spin mt-1"></div>
                                                        : 'Send'}
                                                </div>
                                            </div>

                                            <div>
                                                <button
                                                    disabled={loading && true}
                                                    type="submit"
                                                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 transition-transform active:scale-[98%]"
                                                >
                                                    {
                                                        loading ? 'Creating account..' : ' Create Account'
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="mt-3 space-y-3">
                                        <button
                                            onClick={() => signIn('google')}
                                            type="button"
                                            className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none active:scale-[98%]"
                                        >
                                            <span className="mr-2 inline-block">
                                                <svg
                                                    className="h-6 w-6 text-rose-500"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                >
                                                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                                                </svg>
                                            </span>
                                            Sign up with Google
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )
            }
        </div>
    )
}

export default RegisterForm