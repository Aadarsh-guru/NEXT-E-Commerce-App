'use client'
import { addProductsInCart } from '@/store/slices/CartSlice';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import { BsPlus, BsDash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';

const InteractiveSection = ({ product }) => {

    const [quantity, setQuantity] = React.useState(1);

    const incrementQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const fetchCartProducts = async () => {
        try {
            const response = await axios.get(`/api/cart`);
            dispatch(addProductsInCart(response?.data.products));
            return response?.data.products;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const session = useSession();
    const router = useRouter();
    useQuery(['cart'], fetchCartProducts, { staleTime: Infinity })
    const [loading, setLoading] = React.useState(false);
    const { products } = useSelector(state => state.cart)

    const handleCart = async () => {
        if (session.status === 'unauthenticated') {
            return router.push('/login');
        }
        try {
            setLoading(true);
            const response = await axios.post(`/api/cart`, {
                id: product?._id,
                title: product?.title,
                subTitle: product?.subTitle,
                image: product?.images[0],
                price: product?.price,
                quantity: quantity
            })
            response && setLoading(false);
            const { success, message } = response?.data;
            if (success) {
                queryClient.invalidateQueries(['cart'])
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
        <>
            {product?.stock > 0 ?
                null
                :
                <p className='mb-4 text-center mx-4 text-sm text-red-500' >
                    This product is currently out of stock. please check back later. Thank you for your patience.
                </p>
            }

            {/* Quantity section start here */}
            <div className="w-full bg-gray-100 p-4 rounded-lg mb-8">
                <div className="flex items-center justify-center">
                    <div className="text-xl font-semibold mr-4">Quantity:</div>
                    <div className="flex items-center">
                        <button
                            onClick={decrementQuantity}
                            disabled={loading || product?.stock <= 0}
                            className="px-4 py-2 bg-gray-200 rounded-l-lg hover:bg-gray-300 focus:outline-none transform transition-transform hover:scale-105"
                        >
                            <BsDash className="text-lg" />
                        </button>
                        <span className="px-6 py-3 bg-gray-200 rounded-md text-xl">
                            {quantity}
                        </span>
                        <button
                            onClick={incrementQuantity}
                            disabled={loading || product?.stock <= 0}
                            className="px-4 py-2 bg-gray-200 rounded-r-lg hover:bg-gray-300 focus:outline-none transform transition-transform hover:scale-105"
                        >
                            <BsPlus className="text-lg" />
                        </button>
                    </div>
                </div>
            </div>
            {/* Quantity section end here */}

            {/* buy now button start here */}
            <button
                onClick={() => router.push(`/checkout/${product?._id}/${quantity}`)}
                disabled={loading || product?.stock <= 0}
                className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 cursor-pointer"
            >
                {product?.stock > 0 ? 'Buy Now' : 'Out Of Stock'}
            </button>
            {/* buy now button end here */}
            {/* cart button start */}
            {
                (products?.length > 0 && products.some((p) => p.id === product?._id)) ?
                    <button
                        disabled={loading || product?.stock <= 0}
                        onClick={handleCart}
                        className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 hover:opacity-75 flex items-center justify-center gap-2 mb-10 cursor-pointer"
                    >
                        Remove from cart
                    </button>
                    :
                    <button
                        disabled={loading || product?.stock <= 0}
                        onClick={handleCart}
                        className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 hover:opacity-75 flex items-center justify-center gap-2 mb-10 cursor-pointer"
                    >
                        Add To Cart
                    </button>
            }
            {/* cart button end */}
        </>
    );
};

export default InteractiveSection;
