'use client'
import Spinner from '@/components/loaders/Spinner';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { Suspense, lazy, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
const OrderCard = lazy(() => import('./OrderCard'));

const OrdersContainer = () => {

    const [page, setPage] = useState(1);
    const [orders, setOrders] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`/api/order/get-user-orders/${page}/${12}`);
            const { success, message, orders } = response.data;
            if (success) {
                if (orders.length === 0 || orders.length < 12) {
                    setHasMore(false);
                }
                return orders;
            } else {
                toast.error(message);
                return [];
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred');
            console.error(error);
            return [];
        }
    };

    const { data = [], isLoading, isFetching } = useQuery(['orders', page], fetchOrders, {
        keepPreviousData: true,
        staleTime: Infinity
    });

    useEffect(() => {
        if (data) {
            setOrders([...orders, ...data])
        }
    }, [data])


    return (
        <div className="w-full md:py-10">
            <div className="text-center m--w-[800px] mx-auto mt-8 md:mt-0">
                <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                    <span className='capitalize' >Your Orders</span>
                </div>
            </div>
            {
                isLoading ?
                    (
                        <div className="w-full min-h-[calc(100vh-100px)] flex justify-center items-center">
                            <Spinner />
                        </div>
                    )
                    :
                    orders?.length === 0 ?
                        (
                            <div className="w-full min-h-[calc(100vh-100px)] flex justify-center items-center">
                                <h1 className="text-xl font-bold text-gray-800">No Order Found</h1>
                            </div>
                        )
                        :
                        (
                            <div className="flex flex-col gap-4">
                                {
                                    orders?.map((order, index) => (
                                        <Suspense>
                                            <OrderCard pageKey={page} order={order} key={index} />
                                        </Suspense>
                                    ))
                                }
                            </div>
                        )
            }
            {
                (hasMore && !isLoading) && (
                    <div className="w-full h-[100px] flex justify-center items-center mt-auto">
                        {(isFetching && !isLoading) ? (
                            <Spinner />
                        ) : (
                            <button
                                onClick={() => setPage(page + 1)}
                                className="bg-gray-100 shadow-md  transition-transform text-xl hover:shadow-lg hover:bg-gray-200  active:scale-95 text-black/[0.5] py-3 px-6 rounded-lg duration-300 ease-in-out"
                            >
                                Load More
                            </button>
                        )}
                    </div>
                )
            }
        </div>
    )
}



export default OrdersContainer