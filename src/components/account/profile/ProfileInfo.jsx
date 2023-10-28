'use client'
import Loader from '@/components/loaders/Loader'
import uploadToS3 from '@/helpers/UploadToS3'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { FiEdit } from 'react-icons/fi';

const ProfileInfo = () => {

    const { data, status } = useSession()
    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
    const [showDeleteAccountForm, setShowDeleteAccountForm] = useState(false);
    const [loading, setLoading] = useState(false)
    const [passwordLoading, setPasswordLoading] = useState(false)
    const [accountLoading, setAccountLoading] = useState(false)
    const [emailLoading, setEmailLoading] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [otp, setOtp] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const toggleChangePasswordForm = () => {
        setShowChangePasswordForm(!showChangePasswordForm);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file)
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleUpdate = async () => {
        try {
            setLoading(true)
            let imageUrl;
            if (image) {
                const upload = await uploadToS3(image, 'profile-image')
                if (upload.success) {
                    imageUrl = upload.key;
                }
            }
            const response = await fetch('/api/user/update', {
                method: 'PUT',
                body: JSON.stringify({ name, image: image ? imageUrl : undefined, email: data?.user.email })
            })
            response && setLoading(false)
            const responseData = await response.json();
            if (responseData?.success) {
                toast.success(responseData.message)
                setImage('')
            } else {
                toast.success(responseData.message)
            }
        } catch (error) {
            setLoading(false)
            toast.error('something went wrong.')
            console.log(error);
        }
    }

    useEffect(() => {
        setName(data?.user.name)
    }, [data?.user.name])

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
                body: JSON.stringify({ email: data?.user.email, otp, password })
            })
            const responseData = await response.json()
            setPasswordLoading(false)
            if (responseData?.success) {
                toast.success(responseData?.message)
                toggleChangePasswordForm();
                setOtp('')
                setPassword('')
                setConfirmPassword('')
            } else {
                toast.error(responseData?.message)
            }
        } catch (error) {
            setPasswordLoading(false)
            toast.error('something went wrong.')
            console.log(error);
        }
    }

    const handleDeleteAccount = async () => {
        try {
            setAccountLoading(true)
            const response = await fetch(`/api/user/delete`, {
                method: 'POST',
                body: JSON.stringify({ email: data?.user.email, otp })
            })
            const responseData = await response.json()
            setAccountLoading(false)
            if (responseData?.success) {
                toast.success(responseData?.message)
                setShowDeleteAccountForm(!showDeleteAccountForm);
                await signOut();
            } else {
                toast.error(responseData?.message)
            }
        } catch (error) {
            setAccountLoading(false)
            toast.error('something went wrong.')
            console.log(error);
        }
    }

    const sendOtp = async (subject) => {
        try {
            setEmailLoading(true)
            const response = await fetch(`/api/otp`, {
                method: 'POST',
                body: JSON.stringify({ email: data?.user.email, subject: subject })
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
                                <div className="flex justify-center mb-6">
                                    <label htmlFor="profileImage" className="cursor-pointer relative">
                                        <Image
                                            loading='lazy'
                                            height={128}
                                            width={128}
                                            src={selectedImage || (data?.user.image ? data.user.image : '/account.png')}
                                            alt="User Profile"
                                            className="w-32 h-32 rounded-full border-4 border-blue-500"
                                        />
                                        <input
                                            type="file"
                                            id="profileImage"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />
                                        <div className="absolute bottom-0 right-0 bg-white rounded-full p-1">
                                            <FiEdit className="text-blue-500 cursor-pointer" />
                                        </div>
                                    </label>
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-600 font-medium mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-600 font-medium mb-2">Email</label>
                                    <input
                                        type="email"
                                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                                        value={data && data?.user.email}
                                        disabled={true}
                                    />
                                </div>
                                <div className="mb-6">
                                    <button
                                        onClick={() => loading ? null : handleUpdate()}
                                        disabled={loading && true}
                                        className="bg-green-700 text-white py-2 px-4 rounded-lg w-full transition-transform transform active:scale-95"
                                    >
                                        {loading ? 'updating..' : 'Update Profile'}
                                    </button>
                                </div>
                                {showChangePasswordForm ? (
                                    <div className="mb-6">
                                        {/* Password change form */}
                                        <div className="flex items-center mb-2">
                                            <input
                                                onChange={(e) => setOtp(e.target.value)}
                                                type='number'
                                                placeholder="Enter OTP"
                                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                                            />
                                            <div
                                                className="bg-green-500 text-white py-1 px-3 rounded-lg ml-2 transition-transform transform active:scale-95 cursor-pointer"
                                                onClick={() => emailLoading ? null : sendOtp('Change Password')}
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
                                                onClick={toggleChangePasswordForm}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mb-6">
                                        <button
                                            className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full transition-transform transform active:scale-95"
                                            onClick={toggleChangePasswordForm}
                                        >
                                            Change Password
                                        </button>
                                    </div>
                                )}
                                {/* Delete account logic */}
                                {showDeleteAccountForm ? (
                                    <div className="mb-6">
                                        <div className="flex items-center mb-2">
                                            <input
                                                onChange={(e) => setOtp(e.target.value)}
                                                type='number'
                                                placeholder="Enter OTP"
                                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                                            />
                                            <div
                                                className="bg-green-500 text-white py-1 px-3 rounded-lg ml-2 transition-transform transform active:scale-95 cursor-pointer"
                                                onClick={() => emailLoading ? null : sendOtp('Delete Account')}
                                            >
                                                {emailLoading ? 'sending..' : ' Send'}
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <button
                                                disabled={accountLoading && true}
                                                onClick={() => accountLoading ? null : handleDeleteAccount()}
                                                className="bg-blue-500 text-white py-2 px-4 rounded-lg transition-transform transform active:scale-95 ">
                                                {accountLoading ? 'Deleting..' : 'Delete'}
                                            </button>
                                            <button
                                                className="bg-red-500 text-white py-2 px-4 rounded-lg transition-transform transform active:scale-95"
                                                onClick={() => setShowDeleteAccountForm(!showDeleteAccountForm)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <button
                                            className="bg-red-500 text-white py-2 px-4 rounded-lg w-full transition-transform transform active:scale-95"
                                            onClick={() => setShowDeleteAccountForm(!showDeleteAccountForm)}
                                        >
                                            Delete Account
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                    )
            }

        </>
    )
}

export default ProfileInfo