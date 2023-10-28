'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Loader from '../loaders/Loader'
import { toast } from 'react-hot-toast'

const LoginForm = () => {

    const { status } = useSession()
    const router = useRouter()
    const [data, setData] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/')
        }
    }, [status])

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            await signIn('credentials', data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
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
                                <img
                                    loading='lazy'
                                    className="w-[40px] md:w-[60px] mx-auto"
                                    src="/logo.svg"
                                    alt="logo"
                                />
                                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                    Sign in
                                </h2>
                            </div>
                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                <form onSubmit={(e) => handleLogin(e)} className="space-y-6" >
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
                                                autoComplete="email"
                                                onChange={(e) => setData({ ...data, email: e.target.value })}
                                                required
                                                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                                Password
                                            </label>
                                            <div onClick={(e) => router.push('/forget-password')} className="text-sm">
                                                <Link href="/forget-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                    Forgot password?
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <input
                                                disabled={loading && true}
                                                id="password"
                                                name="password"
                                                type="password"
                                                autoComplete="current-password"
                                                onChange={(e) => setData({ ...data, password: e.target.value })}
                                                required
                                                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            disabled={loading && true}
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            {
                                                loading ? 'Signing in..' : 'Sign in'
                                            }
                                        </button>
                                    </div>
                                    <div>
                                        <button onClick={() => signIn('google')} type="button" className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                                            <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                                            Sign in with Google
                                            <div>
                                            </div>
                                        </button>
                                    </div>
                                </form>

                                <p className="mt-10 text-center text-sm text-gray-500">
                                    Not a member?{' '}
                                    <Link href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                        Register
                                    </Link>
                                </p>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default LoginForm