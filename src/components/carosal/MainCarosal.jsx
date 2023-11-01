'use client'
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Link from 'next/link';

const MainCarosal = ({ slides }) => {
    return (
        <div className="relative text-white text-[20px] w-full max-w-[1360px] mx-auto">
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
                showArrows={false}
                showStatus={false}
            // showIndicators={false}
            >
                {
                    slides?.map((slide, index) => (
                        <div key={index}>
                            <img loading='lazy' src={slide?.image} alt='slide' className='md:w-full aspect-[16/10] md:max-h-[550px] md:aspect-auto object-fill' />
                            <Link href={slide?.url} className="px-[15px] md:px-[40px] py=[10px] md:py-[25px] bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90">
                                Buy Now
                            </Link>
                        </div>
                    ))
                }
            </Carousel>
        </div>
    )
}

export default MainCarosal