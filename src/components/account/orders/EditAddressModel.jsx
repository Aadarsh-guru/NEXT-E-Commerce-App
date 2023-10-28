'use client'
import { Dialog, Transition } from '@headlessui/react'
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState, Fragment, useEffect } from 'react';
import toast from 'react-hot-toast';

const EditAddressModel = ({ isOpen, setIsOpen, order, pageKey }) => {

    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [addressData, setAddressData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        addressDetail: '',
        city: '',
        pincode: '',
        landmark: '',
    });

    const handleUpdateAddress = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm(addressData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            setLoading(true);
            const response = await axios.put(`/api/order/update/user/address`, { ...addressData, orderId: order?._id });
            setLoading(false);
            const { message, success } = response.data;
            if (success) {
                toast.success(message);
                setErrors({});
                queryClient.invalidateQueries(['orders', pageKey]);
                setIsOpen(!isOpen)
            } else {
                toast.error(message);
                setErrors({});
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error('Something went wrong.');
        }
    };

    useEffect(() => {
        setAddressData({
            firstName: order.address.firstName,
            lastName: order.address.lastName,
            email: order.address.email,
            phone: order.address.phone,
            address: order.address.address,
            addressDetail: order.address.addressDetail,
            city: order.address.city,
            pincode: order.address.pincode,
            landmark: order.address?.landmark,
        })
        return () => {
            setAddressData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: '',
                addressDetail: '',
                city: '',
                pincode: '',
                landmark: '',
            })
        }
    }, [order])

    const validateForm = (data) => {
        const errors = {};

        if (!data.firstName) {
            errors.firstName = 'First Name is required';
        } else if (data.firstName.length < 3) {
            errors.firstName = 'First Name must be at least 3 characters';
        }

        if (!data.lastName) {
            errors.lastName = 'Last Name is required';
        } else if (data.lastName.length < 3) {
            errors.lastName = 'Last Name must be at least 3 characters';
        }

        if (!data.email) {
            errors.email = 'Email is required';
        } else if (!isValidEmail(data.email)) {
            errors.email = 'Invalid email format';
        }

        if (!data.phone) {
            errors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(data.phone)) {
            errors.phone = 'Phone number must be 10 digits';
        }

        if (!data.address) {
            errors.address = 'Address is required';
        } else if (data.address.length < 10) {
            errors.address = 'Address must be 10 characters long';
        }

        if (!data.addressDetail) {
            errors.addressDetail = 'House No, Flat No is required';
        } else if (data.addressDetail.length < 5) {
            errors.addressDetail = 'House No, Flat No must be 5 characters long';
        }

        if (!data.city) {
            errors.city = 'City is required';
        } else if (data.city.length < 3) {
            errors.city = 'City must be at least 3 characters';
        }

        if (!data.pincode) {
            errors.pincode = 'Pin code is required';
        } else if (!/^\d{6}$/.test(data.pincode)) {
            errors.pincode = 'Pin code must be 6 digits';
        }

        return errors;
    };

    const isValidEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog open={isOpen} as="div" className="relative z-10" onClose={() => setIsOpen(!isOpen)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className={`w-full max-h-[80vh] md:max-h-max overflow-y-auto max-w-xl transform rounded-2xl bg-white md:p-6 text-left align-middle shadow-xl transition-all`}>
                                <form onSubmit={handleUpdateAddress} className="overflow-hidden rounded-xl bg-white p-4 shadow">
                                    <div className="m-2 gap-6 space-y-4 md:grid md:grid-cols-2 md:space-y-0">
                                        <div className="w-full">
                                            <label
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                htmlFor="firstName"
                                            >
                                                First Name
                                            </label>
                                            <input
                                                className={`flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 ${errors.firstName ? 'border-red-500' : ''
                                                    }`}
                                                type="text"
                                                required
                                                value={addressData.firstName}
                                                onChange={(event) => setAddressData({ ...addressData, firstName: event.target.value })}
                                                placeholder="Enter your first name"
                                                id="firstName"
                                            />
                                            {errors.firstName && (
                                                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                                            )}
                                        </div>

                                        <div className="w-full">
                                            <label
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                htmlFor="lastName"
                                            >
                                                Last Name
                                            </label>
                                            <input
                                                className={`flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 ${errors.lastName ? 'border-red-500' : ''
                                                    }`}
                                                type="text"
                                                required
                                                value={addressData.lastName}
                                                onChange={(event) => setAddressData({ ...addressData, lastName: event.target.value })}
                                                placeholder="Enter your last name"
                                                id="lastName"
                                            />
                                            {errors.lastName && (
                                                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                                            )}
                                        </div>

                                        <div className="col-span-2 grid">
                                            <div className="w-full">
                                                <label
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    htmlFor="email"
                                                >
                                                    Email Address
                                                </label>
                                                <input
                                                    className={`flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 ${errors.email ? 'border-red-500' : ''
                                                        }`}
                                                    type="email"
                                                    required
                                                    value={addressData.email}
                                                    onChange={(event) => setAddressData({ ...addressData, email: event.target.value })}
                                                    placeholder="Enter your email"
                                                    id="email"
                                                />
                                                {errors.email && (
                                                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-span-2 grid">
                                            <div className="w-full">
                                                <label
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    htmlFor="address"
                                                >
                                                    Address
                                                </label>
                                                <input
                                                    className={`flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 ${errors.address ? 'border-red-500' : ''
                                                        }`}
                                                    type="text"
                                                    required
                                                    value={addressData.address}
                                                    onChange={(event) => setAddressData({ ...addressData, address: event.target.value })}
                                                    placeholder="Enter your address"
                                                    id="address"
                                                />
                                                {errors.address && (
                                                    <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-span-2 grid">
                                            <div className="w-full">
                                                <label
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    htmlFor="address2"
                                                >
                                                    House No, Flat No
                                                </label>
                                                <input
                                                    className={`flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 ${errors.addressDetail ? 'border-red-500' : ''
                                                        }`}
                                                    type="text"
                                                    required
                                                    value={addressData.addressDetail}
                                                    onChange={(event) => setAddressData({ ...addressData, addressDetail: event.target.value })}
                                                    placeholder="Enter address details with house no / flat no"
                                                    id="address2"
                                                />
                                                {errors.addressDetail && (
                                                    <p className="text-red-500 text-xs mt-1">{errors.addressDetail}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="w-full">
                                            <label
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                htmlFor="city"
                                            >
                                                City
                                            </label>
                                            <input
                                                className={`flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 ${errors.city ? 'border-red-500' : ''
                                                    }`}
                                                type="text"
                                                required
                                                value={addressData.city}
                                                onChange={(event) => setAddressData({ ...addressData, city: event.target.value })}
                                                placeholder="Enter your city"
                                                id="city"
                                            />
                                            {errors.city && (
                                                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                                            )}
                                        </div>

                                        <div className="w-full">
                                            <label
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                htmlFor="pincode"
                                            >
                                                Pin code
                                            </label>
                                            <input
                                                className={`flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 ${errors.pincode ? 'border-red-500' : ''
                                                    }`}
                                                type="number"
                                                required
                                                value={addressData.pincode}
                                                onChange={(event) => setAddressData({ ...addressData, pincode: event.target.value })}
                                                placeholder="Enter your pincode"
                                                id="pincode"
                                            />
                                            {errors.pincode && (
                                                <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
                                            )}
                                        </div>

                                        <div className="w-full">
                                            <label
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                htmlFor="landmark"
                                            >
                                                Landmark
                                            </label>
                                            <input
                                                className={`flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 ${errors.landmark ? 'border-red-500' : ''
                                                    }`}
                                                type="text"
                                                value={addressData.landmark}
                                                onChange={(event) => setAddressData({ ...addressData, landmark: event.target.value })}
                                                placeholder="Enter landmark (Optional)"
                                                id="landmark"
                                            />
                                            {errors.landmark && (
                                                <p className="text-red-500 text-xs mt-1">{errors.landmark}</p>
                                            )}
                                        </div>

                                        <div className="w-full">
                                            <label
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                htmlFor="phone"
                                            >
                                                Phone
                                            </label>
                                            <input
                                                className={`flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 ${errors.phone ? 'border-red-500' : ''
                                                    }`}
                                                type="number"
                                                required
                                                value={addressData.phone}
                                                onChange={(event) => setAddressData({ ...addressData, phone: event.target.value })}
                                                placeholder="Enter your phone number"
                                                id="phone"
                                            />
                                            {errors.phone && (
                                                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                                            )}
                                        </div>

                                        <div className="col-span-2 grid">
                                            <button
                                                disabled={loading}
                                                type="submit"
                                                className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-transform active:scale-[99%]"
                                            >
                                                {loading ? 'Saving...' : 'Edit Address'}
                                            </button>
                                        </div>

                                        <div className="col-span-2 grid md:hidden">
                                            <div
                                                onClick={() => setIsOpen(!isOpen)}
                                                className="w-full rounded-md border-2 px-3 py-2 text-gray-700 text-center transition-transform active:scale-[99%]"
                                            >
                                                Cancel Changes
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default EditAddressModel;
