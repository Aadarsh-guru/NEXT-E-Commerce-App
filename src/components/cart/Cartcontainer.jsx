'use client'
import React from 'react'
import CartItem from './CartItem'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { addProductsInCart } from '@/store/slices/CartSlice'
import axios from 'axios'
import toast from 'react-hot-toast'
import Spinner from '../loaders/Spinner'

const Cartcontainer = () => {

    const fetchWishlistProducts = async () => {
        try {
            const response = await axios.get(`/api/cart`);
            dispatch(addProductsInCart(response?.data.products));
            return response?.data.products;
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
            return [];
        }
    }

    const dispatch = useDispatch();
    const { isLoading } = useQuery(['cart'], fetchWishlistProducts, { staleTime: Infinity })
    const { products } = useSelector(state => state.cart)

    const calculateSubtotal = () => {
        if (!products || products.length === 0) {
            return 0;
        }
        const amount = products.reduce((accumulator, product) => {
            return accumulator + product.price * product.quantity;
        }, 0);
        return amount;
    }

    return (
        <>
            {
                isLoading ? <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
                    <Spinner />
                </div>
                    :
                    products && products?.length === 0 ?
                        (
                            <div className="flex=[2] flex flex-col items-center pb-[50px] md:-m-14">
                                <Image width={300} height={300} src={'/empty-cart.jpg'} className='w-[300px] md:w-[400px]' />
                                <span className='text-xl font-bold' >
                                    Your Cart Is Empty.
                                </span>
                                <span className='text-center mt-4' >
                                    Looks Like You have not added anything in your cart.
                                    <br />
                                    Go ahead and explore top categories.
                                </span>
                                <Link href={'/'}
                                    className='py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8'
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        )
                        :
                        (
                            <div className=" flex flex-col lg:flex-row gap-12 py-10">
                                <div className="flex-[2]">
                                    <div className="text-lg font-bold">Cart Items</div>
                                    {
                                        products?.map((product, index) => (
                                            <CartItem key={index} product={product} />
                                        ))
                                    }
                                </div>
                                <div className="flex-[1]">
                                    <div className="text-lg font-bold">Cart Summary</div>
                                    <div className=" p-5 my-5 bg-black/[0.05] rounded-xl">
                                        <div className=" flex justify-between">
                                            <div className=" uppercase text-md md:text-lg font-medium text-black ">Subtotal</div>
                                            <div className="text-md md:text-lg font-medium text-black">MRP ₹ {calculateSubtotal().toFixed(2)}</div>
                                        </div>
                                        <div className="text-sm md:text-md py-5 border-t mt-5">
                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium eos earum dicta voluptates nemo. Dolore nisi a enim in qui incidunt officiis blanditiis aut, eligendi ducimus, est cupiditate provident facilis.
                                        </div>
                                    </div>
                                    <Link href={'/checkout'} type="button" className='w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 text-center' >
                                        Checkout
                                    </Link>
                                </div>
                            </div>
                        )
            }
        </>
    )
}

export default Cartcontainer