'use client'
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const ContactForm = ({ sendMessage }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const validationErrors = {
            firstName: (value) => value.length < 3 && 'First name must be at least 3 characters',
            lastName: (value) => value.length < 3 && 'Last name must be at least 3 characters',
            email: (value) =>
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && 'Invalid email address',
            phone: (value) => value.length !== 10 && 'Phone number must be 10 digits',
            subject: (value) =>
                value.length > 100 && 'Subject must not contain more than 100 characters',
            message: (value) => value.length < 100 && 'Message must be at least 100 characters',
        };

        const newErrors = {};
        for (const key in formData) {
            if (validationErrors[key]) {
                const error = validationErrors[key](formData[key]);
                if (error) {
                    newErrors[key] = error;
                }
            }
        }

        return newErrors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            setLoading(true);
            const response = await sendMessage(formData);
            setLoading(false);
            if (response.success) {
                toast.success(response.message);
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: '',
                });
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            setLoading(false);
            toast.error('Something went wrong.');
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSendMessage} className="mt-8 space-y-4">
            <div className="grid w-full gap-y-4 md:gap-x-4 lg:grid-cols-2">
                <div className="grid w-full items-center gap-1.5">
                    <label
                        className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="first_name"
                    >
                        First Name
                    </label>
                    <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        type="text"
                        id="first_name"
                        name="firstName"
                        placeholder="First Name"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                    />
                    {errors.firstName && (
                        <div className="text-red-600 text-[10px] flex items-center gap-1">

                            {errors.firstName}
                        </div>
                    )}
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <label
                        className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="last_name"
                    >
                        Last Name
                    </label>
                    <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        type="text"
                        id="last_name"
                        name="lastName"
                        placeholder="Last Name"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                    />
                    {errors.lastName && (
                        <div className="text-red-600 text-[10px] flex items-center gap-1">

                            {errors.lastName}
                        </div>
                    )}
                </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
                <label
                    className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="email"
                >
                    Email
                </label>
                <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                />
                {errors.email && (
                    <div className="text-red-600 text-[10px] flex items-center gap-1">
                        {errors.email}
                    </div>
                )}
            </div>
            <div className="grid w-full items-center gap-1.5">
                <label
                    className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="phone_number"
                >
                    Phone Number
                </label>
                <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                    type="tel"
                    id="phone_number"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                />
                {errors.phone && (
                    <div className="text-red-600 text-[10px]">
                        {errors.phone}
                    </div>
                )}
            </div>
            <div className="grid w-full items-center gap-1.5">
                <label
                    className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="subject"
                >
                    Subject
                </label>
                <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Describe your subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                />
                {errors.subject && (
                    <div className="text-red-600 text-[10px] flex items-center gap-1">
                        {errors.subject}
                    </div>
                )}
            </div>
            <div className="grid w-full items-center gap-1.5">
                <label
                    className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="message"
                >
                    Message
                </label>
                <textarea
                    className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                    id="message"
                    name="message"
                    placeholder="Share your message with us"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                />
                {errors.message && (
                    <div className="text-red-600 text-[10px] flex items-center gap-1">
                        {errors.message}
                    </div>
                )}
            </div>
            <button
                disabled={loading}
                type="submit"
                className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-transform active:scale-[98%]"
            >
                {loading ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    );
};

export default ContactForm;
