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
            router.back()
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
                                                placeholder='Email'
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
                                                placeholder='Password'
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
                        // <section>
                        //     <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                        //         <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                        //             <h2 className="text-center text-2xl font-bold leading-tight text-black">
                        //                 Sign in
                        //             </h2>
                        //             <p className="mt-2 text-center text-sm text-gray-600 ">
                        //                 Don&apos;t have an account?{' '}
                        //                 <a
                        //                     href="#"
                        //                     title=""
                        //                     className="font-semibold text-black transition-all duration-200 hover:underline"
                        //                 >
                        //                     Create a free account
                        //                 </a>
                        //             </p>
                        //             <form action="#" method="POST" className="mt-8">
                        //                 <div className="space-y-5">
                        //                     <div>
                        //                         <label htmlFor="" className="text-base font-medium text-gray-900">
                        //                             {' '}
                        //                             Email address{' '}
                        //                         </label>
                        //                         <div className="mt-2">
                        //                             <input
                        //                                 className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        //                                 type="email"
                        //                                 placeholder="Email"
                        //                             ></input>
                        //                         </div>
                        //                     </div>
                        //                     <div>
                        //                         <div className="flex items-center justify-between">
                        //                             <label htmlFor="" className="text-base font-medium text-gray-900">
                        //                                 {' '}
                        //                                 Password{' '}
                        //                             </label>
                        //                             <a href="#" title="" className="text-sm font-semibold text-black hover:underline">
                        //                                 {' '}
                        //                                 Forgot password?{' '}
                        //                             </a>
                        //                         </div>
                        //                         <div className="mt-2">
                        //                             <input
                        //                                 className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        //                                 type="password"
                        //                                 placeholder="Password"
                        //                             ></input>
                        //                         </div>
                        //                     </div>
                        //                     <div>
                        //                         <button
                        //                             type="button"
                        //                             className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                        //                         >
                        //                             Get started
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
                        //                     Sign in with Google
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

export default LoginForm