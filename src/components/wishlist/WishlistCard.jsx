'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { FaHeart } from 'react-icons/fa';
import toast from 'react-hot-toast';;
import { useQueryClient } from '@tanstack/react-query'

const WishlistCard = ({ product }) => {

    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();
    const { data } = useSession()


    const handleWishlist = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(`/api/wishlist`, {
                id: product?.id,
                userId: data?.user.id,
                title: product?.title,
                image: product?.image,
                price: product?.price,
                discount: product?.discount,
            })
            response && setLoading(false);
            const { success, message } = response?.data;
            if (success) {
                queryClient.invalidateQueries(['wishlist'])
                toast.success(message);
            } else {
                toast.error(message);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <Link className='transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer relative' href={`/product/${product?.id}`}>
            <img loading='lazy' className='w-full max-h-[300px] aspect-square' src={product?.image} alt="Product Image" />
            <button type="button" disabled={loading} className="absolute top-2 right-2 p-1 transition-transform active:scale-95" onClick={handleWishlist}>
                <FaHeart className='text-[24px] transition-transform text-red-600 hover:text-red-500' />
            </button>
            <div className="p-4 text-black/[0.9]">
                <h2 className='text-lg font-medium'>{product?.title}</h2>
                <div className="flex items-center flex-wrap text-black/[0.5]">
                    <p className='mr-2 text-lg font-semibold' >{product?.price}</p>
                    <p className='text-base font-medium line-through' >{Math.round(product?.price + (product?.price / 2))}</p>
                    <p className='ml-auto text-base font-medium text-green-500' >{product?.discount}% off</p>
                </div>
            </div>
        </Link>
    );
}

export default WishlistCard;
