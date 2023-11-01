'use client'
import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import UpdateProductCarosalCard from './UpdateProductCarosalCard';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1023, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 767, min: 0 },
        items: 1,
    },
};


const UpdateProductCarosal = ({ slides, productId }) => {

    return (
        <div className="mt-[50px] mb-[100px] md:mb-0">
            {
                slides?.length <= 0 ?
                    (
                        <div className="h-[200px] w-full flex justify-center items-center">
                            <h1>No Images found.</h1>
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
                                    <UpdateProductCarosalCard slide={slide} key={index} productId={productId} />
                                ))
                            }
                        </Carousel>
                    )
            }
        </div>
    )
}

export default UpdateProductCarosal