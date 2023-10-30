import Link from 'next/link';
import React from 'react';

export default function AboutPageOne() {
    return (
        <div>
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24 text-center">
                    <p className="text-3xl font-bold text-gray-900 md:text-5xl md:leading-10 text-center">
                        Discover Your Next Adventure in the World of Books
                    </p>
                    <p className="text-base text-gray-600 md:text-xl text-center">
                        Welcome to our online book emporium, where every book lover's dreams come true. Dive into our vast
                        collection of books, from timeless classics to the latest bestsellers.
                    </p>
                </div>
                <div className="w-full space-y-4">
                    <img
                        className="h-[200px] w-full rounded-xl object-cover md:h-full"
                        src="https://dev-ui-image-assets.s3.ap-south-1.amazonaws.com/google-map.jpg"
                        alt=""
                    />
                </div>
                <div className="flex flex-col items-center gap-x-4 gap-y-4 py-16 md:flex-row">
                    <div className="space-y-6">
                        <p className="text-sm font-semibold md:text-base">Explore Our Collections &rarr;</p>
                        <p className="text-3xl font-bold md:text-4xl">Your Literary Journey Begins Here</p>
                        <p className="text-base text-gray-600 md:text-lg">
                            We're more than just a bookstore; we're your guide to endless worlds, characters, and stories.
                            Find your next favorite book and let your imagination soar.
                        </p>
                        <Link href={'/'}
                            type="button"
                            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-transform active:scale-95"
                        >
                            Start Exploring
                        </Link>
                    </div>
                    <div className="md:mt-o mt-10 w-full">
                        <img
                            src="https://images.unsplash.com/photo-1605165566807-508fb529cf3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
                            alt="Getting Started"
                            className="rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
