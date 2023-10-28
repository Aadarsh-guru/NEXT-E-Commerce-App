'use client'
import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { PiShareFat } from 'react-icons/pi';
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux';
import { addProducts } from '@/store/slices/WishlistSlice';
import ShareModel from '../wishlist/ShareModel';

const ShareSection = ({ product }) => {

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

    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    useQuery(['wishlist'], fetchWishlistProducts, { staleTime: Infinity })
    const [loading, setLoading] = React.useState(false);
    const { products } = useSelector(state => state.wishlist)

    const handleWishlist = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`/api/wishlist`, {
                id: product?._id,
                title: product?.title,
                image: product?.images[0],
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

    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="w-full h-20 mb-5 flex justify-between items-center gap-5">
            {
                (products?.length > 0 && products.some((p) => p.id === product?._id)) ?
                    <button disabled={loading} onClick={() => {
                        handleWishlist();
                    }} className={`w-full py-3 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 hover:opacity-75 flex items-center justify-center gap-3 mb-10`} >
                        <FaHeart style={{ fontSize: '20px' }} className='text-red-500' />  Wishlist
                    </button>
                    :
                    <button disabled={loading} onClick={() => {
                        handleWishlist();
                    }} className={`w-full py-3 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 hover:opacity-75 flex items-center justify-center gap-3 mb-10`} >
                        <FaRegHeart style={{ fontSize: '20px' }} />  Wishlist
                    </button>
            }
            <button onClick={() => setIsOpen(!isOpen)} disabled={loading} className='w-full py-3 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 hover:opacity-75 flex items-center justify-center gap-3 mb-10' >
                <PiShareFat style={{ fontSize: '20px' }} /> Share
            </button>
            <ShareModel isOpen={isOpen} setIsOpen={setIsOpen} title={product?.title} />
        </div>
    )
}

export default ShareSection