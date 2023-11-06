import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductCard = ({ product }) => {

    return (
        <Link className='transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer' href={`/product/${product?._id}`}>
            <Image width={300} height={300} className='w-full max-h-[300px] aspect-square' src={product?.images[0]} alt="Product Image" />
            <div className="p-4 text-black/[0.9]">
                <h2 className='text-lg  font-medium ' >{product?.title}</h2>
                <div className="flex items-center flex-wrap text-black/[0.5]">
                    <p className='mr-2 text-lg font-semibold' >{product?.price}</p>
                    <p className='text-base font-medium line-through' >{Math.round(product?.price + (product?.price / 2))}</p>
                    <p className='ml-auto text-base font-medium text-green-500' >{product?.discount}% off</p>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard