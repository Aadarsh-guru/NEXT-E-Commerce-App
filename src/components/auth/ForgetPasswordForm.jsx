'use client'
import Loader from '@/components/loaders/Loader'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const ForgetPasswordForm = () => {

    const router = useRouter();
    const { data, status } = useSession()
    const [emailLoading, setEmailLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleForgetPassword = async () => {
        try {
            if (!password || !confirmPassword || !otp) {
                return toast.error('Fill all feilds.')
            }
            if (password !== confirmPassword) {
                return toast.error('Passwords are not matching.')
            }
            if (password.length < 6) {
                return toast.error('Password length must be 6 characters')
            }
            setPasswordLoading(true)
            const response = await fetch(`/api/user/change-password`, {
                method: 'PUT',
                body: JSON.stringify({ email, otp, password })
            })
            const responseData = await response.json()
            setPasswordLoading(false)
            if (responseData?.success) {
                toast.success(responseData?.message)
                router.push('/login')
            } else {
                toast.error(responseData?.message)
            }
        } catch (error) {
            setPasswordLoading(false)
            toast.error('something went wrong.')
            console.log(error);
        }
    }

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/')
        }
    }, [status])


    const sendOtp = async () => {
        try {
            if (!email) {
                return toast.error('enter email first')
            }
            setEmailLoading(true)
            const response = await fetch(`/api/otp`, {
                method: 'POST',
                body: JSON.stringify({ email, subject: 'Forget Password' })
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
        <>
            {
                status === 'loading' ?
                    (
                        <Loader />
                    )
                    :
                    (
                        <div className="min-h-screen flex justify-center items-center">
                            <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 lg:p-10 w-full md:w-1/2">
                                <div className="mb-6">
                                    <input
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter Email"
                                        className="w-full border rounded-lg px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
                                    />
                                    <div className="flex items-center mb-2">
                                        <input
                                            onChange={(e) => setOtp(e.target.value)}
                                            type='number'
                                            placeholder="Enter OTP"
                                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                                        />
                                        <div
                                            className="bg-green-500 text-white py-1 px-3 rounded-lg ml-2 transition-transform transform active:scale-95 cursor-pointer"
                                            onClick={() => (emailLoading || passwordLoading) ? null : sendOtp()}
                                        >
                                            {emailLoading ? 'sending..' : ' Send'}
                                        </div>
                                    </div>
                                    <input
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="New Password"
                                        className="w-full border rounded-lg px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
                                    />
                                    <input
                                        type="text"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm New Password"
                                        className="w-full border rounded-lg px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
                                    />
                                    <div className="flex justify-between">
                                        <button
                                            disabled={passwordLoading && true}
                                            onClick={() => passwordLoading ? null : handleForgetPassword()}
                                            className="bg-blue-500 text-white py-2 px-4 rounded-lg transition-transform transform active:scale-95 ">
                                            {passwordLoading ? 'Loading..' : 'Submit'}
                                        </button>
                                        <button
                                            className="bg-red-500 text-white py-2 px-4 rounded-lg transition-transform transform active:scale-95"
                                            onClick={() => router.back()}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
            }

        </>
    )
}

export default ForgetPasswordForm