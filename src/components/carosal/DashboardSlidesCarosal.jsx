'use client'
import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Spinner from '../loaders/Spinner';
import SlideCard from '../dashboard/settings/SlideCard';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 2,
    },
    tablet: {
        breakpoint: { max: 1023, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 767, min: 0 },
        items: 1,
    },
};


const DashboardSlidesCarosal = ({ slides, isLoading }) => {

    return (
        <div className="mt-[50px] mb-[100px] md:mb-0">
            {
                slides?.length > 0 && <div className="my-4 text-center text-xl font-bold text-gray-700 md:text-2xl lg:text-3xl dark:text-white" > Total Slides {slides?.length}</div>
            }            {
                isLoading ?
                    (
                        <div className="min-h-[400px] w-full flex justify-center items-center">
                            <Spinner />
                        </div>
                    )
                    :
                    slides?.length <= 0 ?
                        (
                            <div className="h-[200px] w-full flex justify-center items-center">
                                <h1>No Slides found.</h1>
                            </div>
                        )
                        :
                        (
                            <Carousel
                                responsive={responsive}
                                containerClass="-mx-[10px]"
                                itemClass="px-[10px]"
                                autoPlay={true}
                            >
                                {
                                    slides?.map((slide, index) => (
                                        <SlideCard slide={slide} key={index} />
                                    ))
                                }
                            </Carousel>
                        )
            }
        </div>
    )
}

export default DashboardSlidesCarosal