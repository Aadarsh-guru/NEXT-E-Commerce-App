import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { RiDeleteBin6Line } from 'react-icons/ri';

const CartItem = ({ product }) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();

    const handleDeleteFromCart = async (e) => {
        try {
            setLoading(true);
            const response = await axios.post(`/api/cart`, {
                id: product?.id,
                title: product?.title,
                subTitle: product?.subTitle,
                image: product?.image,
                price: product?.price,
                quantity: product?.quantity,
            });
            setLoading(false);
            const { success, message } = response?.data;
            if (success) {
                queryClient.invalidateQueries(['cart']);
                toast.success(message);
            } else {
                toast.error(message);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error('Something went wrong');
        }
    }

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <div className="flex py-5 gap-4 border-b border-gray-200">
            <div className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] aspect-square">
                <img
                    onClick={() => router.push(`/product/${product?.id}`)}
                    loading="lazy"
                    className="w-full h-full object-cover rounded cursor-pointer"
                    src={product?.image}
                    alt="Product Image"
                />
            </div>
            <div className="flex flex-col w-full">
                <div className="text-lg md:text-2xl font-semibold text-gray-800">
                    {truncateText(product?.title, 15)} {/* Truncate title after 30 characters */}
                </div>
                <div className="hidden md:block text-sm font-medium text-gray-500">
                    {truncateText(product?.subTitle, 30)} {/* Truncate subTitle after 50 characters */}
                </div>
                <div className="flex flex-col md:flex-row justify-between mt-2 md:mt-4">
                    <div className="text-sm md:text-md font-bold text-gray-700">
                        MRP: ₹ {product?.price}
                    </div>
                    <div className="flex items-center text-sm md:text-md text-gray-600">
                        <div className="font-semibold">Quantity:
                            <span className='ml-2' >
                                {product?.quantity}
                            </span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={loading ? null : handleDeleteFromCart}
                    disabled={loading}
                    className="flex items-center justify-end mt-3 md:mt-4"
                >
                    <RiDeleteBin6Line className="cursor-pointer text-gray-600 hover:text-gray-800 text-lg md:text-xl" />
                </button>
            </div>
        </div>
    );
};

export default CartItem;
