'use client'
import Spinner from '@/components/loaders/Spinner';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import DashboardProductCard from './DashboardProductCard';

const ProductsContainer = ({ query }) => {

    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`/api/product/get/get-all/${page}/${12}`);
            const { success, message, products } = response.data;
            if (success) {
                if (products.length === 0 || products.length < 12) {
                    setHasMore(false);
                }
                return products;
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

    const { data = [], isLoading, isFetching } = useQuery([query, page], fetchProducts, {
        keepPreviousData: true,
        staleTime: Infinity
    });

    useEffect(() => {
        if (data) {
            setProducts([...products, ...data])
        }
    }, [data])

    return (
        <div className="w-full h-[calc(100vh-60px)] flex flex-col justify-start items-center p-4 gap-4 overflow-y-auto">
            {
                isLoading ?
                    (
                        <div className="w-full h-full flex justify-center items-center">
                            <Spinner />
                        </div>
                    )
                    :
                    products?.length === 0 ?
                        (
                            <div className="w-full h-full flex justify-center items-center">
                                <h1 className="text-2xl font-bold text-gray-800">No Product Found.</h1>
                            </div>
                        )
                        :
                        (
                            <>
                                <div className="w-full h-full flex justify-center items-center mb-10 md:mb-0 md:w-1/2 md:h-1/2 lg:w-1/3 lg:h-1/3">
                                    <h1 className="text-xl font-bold text-gray-500">Showing {products?.length} Products.</h1>
                                </div>
                                <div className="gap-5 my-10">
                                    {
                                        products?.map((product, index) => (
                                            <DashboardProductCard product={product} key={index} setProducts={setProducts} />
                                        ))
                                    }
                                </div>
                            </>
                        )
            }
            {
                (hasMore && !isLoading) && (
                    <div className="w-full h-[100px] flex justify-center items-center">
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

export default ProductsContainer