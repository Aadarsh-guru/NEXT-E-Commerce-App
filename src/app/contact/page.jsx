import ContactForm from '@/components/contact/ContactForm';
import { contactEmailTemplate } from '@/helpers/EmailTemplates';
import sendMail from '@/helpers/SendMail';
import React from 'react';

function ContactPage() {

    const handleSendMesaage = async ({ firstName, lastName, email, phone, subject, message }) => {
        'use server'
        const response = await sendMail({
            from: email,
            to: process.env.NEXT_PUBLIC_ADMINISTRATOR_EMAIL,
            subject: subject,
            html: contactEmailTemplate({ firstName, lastName, email, phone, subject, message })
        })
        if (response.success) {
            return { message: 'Message Sent!', success: true }
        } else {
            return { message: 'Error while sending the message.', success: false }
        }
    }

    return (
        <div>
            <div className="mx-auto max-w-7xl px-4">
                {/* Hero Map */}
                <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
                    <p className="text-center text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
                        We're Eager to Hear from You
                    </p>
                    <p className="mx-auto max-w-4xl text-center text-base text-gray-600 md:text-xl">
                        Whether you have questions, feedback, or just want to say hello, we're here for you.
                    </p>
                </div>
                <div className="mx-auto max-w-7xl py-12 md:py-24">
                    <div className="grid items-center justify-items-center gap-x-4 gap-y-10 lg:grid-cols-2">
                        {/* Contact Form */}
                        <div className="flex items-center justify-center">
                            <div className="px-2 md:px-12">
                                <p className="text-2xl font-bold text-gray-900 md:text-4xl text-center">Get in Touch</p>
                                <p className="mt-4 text-lg text-gray-600 text-center">
                                    Our friendly team would love to hear from you.
                                </p>
                                <ContactForm sendMessage={handleSendMesaage} />
                            </div>
                        </div>
                        <img
                            alt="Contact us"
                            className="hidden max-h-full w-full rounded-lg object-cover lg:block"
                            src="https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&h=800&q=80"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;
