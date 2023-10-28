'use client'
import axios from 'axios';
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux';
import { addProducts } from '@/store/slices/WishlistSlice';
import WishlistCard from './WishlistCard';
import Spinner from '../loaders/Spinner';


const WishlistContainer = () => {

    const fetchWishlistProducts = async () => {
        try {
            const response = await axios.get(`/api/wishlist`);
            dispatch(addProducts(response?.data.products));
            return response?.data.products;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    const dispatch = useDispatch();
    const { isLoading } = useQuery(['wishlist'], fetchWishlistProducts, { staleTime: Infinity })
    const { products } = useSelector(state => state.wishlist)

    return (
        <div className="">
            <div className="md:block text-2xl md:text-3xl mt-10 font-bold text-center"> Your Wishlist</div>
            {
                isLoading && <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
                    <Spinner />
                </div>
            }
            {
                products && products?.length === 0 &&
                <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
                    You have no items in your wishlist.
                </div>
            }
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
                {
                    products?.map((product, index) => (
                        <WishlistCard key={index} product={product} />
                    ))
                }
            </div>
        </div>
    )
}

export default WishlistContainer