'use client'
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const ProductCarosal = ({ product }) => {
    return (
        <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
            <Carousel
                infiniteLoop={true}
                showIndicators={false}
                showStatus={false}
                thumbWidth={60}
                className='productCarousel'
            >
                {
                    product?.images.map((imgage, index) => (
                        <img loading='lazy' className='aspect-square max-h-[500px]' src={imgage} key={index} alt="product image" />
                    ))
                }
            </Carousel>
        </div>
    )
}

export default ProductCarosal