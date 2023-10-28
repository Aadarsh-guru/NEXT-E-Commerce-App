'use client'
import Spinner from '@/components/loaders/Spinner';
import ProductCard from '@/components/product/ProductCard'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const ProductsContainer = ({ category }) => {

    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`/api/product/get/category/${category}/${page}/${12}`);
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

    const { data = [], isLoading, isFetching } = useQuery([`${category}-products`, page], fetchProducts, {
        keepPreviousData: true,
        staleTime: Infinity
    });

    useEffect(() => {
        if (data) {
            setProducts([...products, ...data])
        }
    }, [data])

    return (
        <div className="w-full min-h-[100vh] flex flex-col justify-start p-4 gap-4 overflow-y-auto">
            {
                isLoading ?
                    (
                        <div className="w-full min-h-[100vh] flex justify-center items-center">
                            <Spinner />
                        </div>
                    )
                    :
                    products?.length === 0 ?
                        (
                            <div className="w-full min-h-[100vh] flex justify-center items-center">
                                <h1 className="text-xl font-bold text-gray-800">No Product Found. for - {category} </h1>
                            </div>
                        )
                        :
                        (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
                                {
                                    products?.map((product, index) => (
                                        <ProductCard product={product} key={index} />
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

export default ProductsContainer