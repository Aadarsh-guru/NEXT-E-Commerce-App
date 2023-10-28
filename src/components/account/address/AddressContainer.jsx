'use client'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import toast from 'react-hot-toast';

function AddressContainer() {

    const queryClient = useQueryClient();
    const session = useSession();
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

    const handleAddOrUpdateAddress = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm(addressData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post(`/api/address`, addressData);
            setLoading(false);
            const { message, success } = response.data;
            if (success) {
                toast.success(message);
                setErrors({});
                queryClient.invalidateQueries(['address']);
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

    useQuery(['address'], async () => {
        try {
            const response = await axios.get(`/api/address`);
            const { success, address } = response.data;
            if (success) {
                setAddressData({
                    firstName: address.firstName,
                    lastName: address.lastName,
                    email: address.email,
                    phone: address.phone,
                    address: address.address,
                    addressDetail: address.addressDetail,
                    city: address.city,
                    pincode: address.pincode,
                    landmark: address.landmark
                })
            } else {
                setAddressData({
                    firstName: session?.data?.user.name.split(' ')[0],
                    lastName: session?.data?.user.name.split(' ')[1],
                    email: session?.data?.user.email,
                })
            }
            return address;
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    })

    return (
        <div className="mx-auto w-full min-h-screen max-w-7xl bg-slate-100 rounded-lg py-2">
            <div className="mx-auto my-4 max-w-2xl md:my-6">
                <form onSubmit={handleAddOrUpdateAddress} className="overflow-hidden rounded-xl bg-white p-4 shadow">
                    <p className="text-sm font-bold text-gray-900 text-center">Your Address</p>
                    <div className="mt-6 gap-6 space-y-4 md:grid md:grid-cols-2 md:space-y-0">
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
                                {loading ? 'Saving...' : 'Save Address'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddressContainer;
