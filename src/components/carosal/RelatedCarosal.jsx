'use client'
import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from '../product/ProductCard';

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


const RelatedCarosal = ({ products }) => {

    return (
        <div className="mt-[50px] md:mt-[100px] mb-[100px] md:mb-0">
            <div className="text-2xl font-bold mb-5">You Might Also Like</div>
            {
                products?.length <= 0 ?
                    (
                        <div className="h-[200px] w-full flex justify-center items-center">
                            <h1>No Related Products found.</h1>
                        </div>
                    )
                    :
                    (
                        <Carousel
                            responsive={responsive}
                            containerClass="-mx-[10px]"
                            itemClass="px-[10px]"
                        >
                            {
                                products?.map((product, index) => (
                                    <ProductCard key={index} product={product} />
                                ))
                            }
                        </Carousel>
                    )
            }
        </div>
    )
}

export default RelatedCarosal