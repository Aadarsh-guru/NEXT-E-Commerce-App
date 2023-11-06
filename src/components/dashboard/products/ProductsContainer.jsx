'use client'
import Spinner from '@/components/loaders/Spinner';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import DashboardProductCard from './DashboardProductCard';
import { Menu, Transition } from '@headlessui/react';
import { MdKeyboardArrowDown } from 'react-icons/md';

const ProductsContainer = () => {

    const [page, setPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('All');
    const [products, setProducts] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const handleSearch = async (e) => {
        e.preventDefault();
        setPage(1);
        setProducts([]);
        setHasMore(true);
        setCategory('All');
        setSearchQuery(searchValue);
        return;
    }

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`/api/product/get/get-all/${page}/${12}?${category === 'All' ? '' : `category=${category}`}${searchValue ? `&search=${searchValue}` : ''}`);
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

    const { data = [], isLoading, isFetching } = useQuery(['dashboard-products', page, category, searchQuery], fetchProducts, {
        keepPreviousData: true,
        staleTime: Infinity
    });

    const { data: categoryData } = useQuery(['categories'], async () => {
        const response = await axios.get(`/api/category`);
        return response.data;
    }, {
        staleTime: Infinity
    });

    useEffect(() => {
        if (data) {
            setProducts([...products, ...data])
        }
    }, [data])

    return (
        <div className="w-full h-full">
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 w-full py-4 flex items-center justify-between px-6 rounded-t-lg">
                <h4 className='text-2xl font-bold text-white'>All Products</h4>
                <div className="flex items-center">
                    <form onSubmit={handleSearch} class="relative">
                        <input
                            type="search"
                            class="w-64 h-10 px-3 py-2 pl-4 text-gray-700 border rounded-full focus:outline-none focus:shadow-outline"
                            placeholder="Search..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <button className='hidden' type="submit"></button>
                    </form>
                </div>
                <div className="flex items-center">
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 capitalize">
                                {category}
                                <MdKeyboardArrowDown
                                    className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                                    aria-hidden="true"
                                />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 mt-2 w-56 max-h-56 p-1 gap-1 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 my focus:outline-none overflow-y-auto">
                                <Menu.Item>
                                    <button
                                        onClick={() => { setCategory('All'); setProducts([]); setPage(1); setHasMore(true); }}
                                        className={`w-full text-left px-4 py-3 text-sm capitalize hover:bg-blue-500 hover:text-white ${category === 'All' ? 'bg-blue-500 text-white' : ''}  rounded-md`}
                                    >
                                        All Products
                                    </button>
                                </Menu.Item>
                                {
                                    categoryData?.categories.map((item, index) => (
                                        <Menu.Item key={index}>
                                            <button
                                                onClick={() => { setCategory(item?.slug); setProducts([]) }}
                                                className={`w-full text-left px-4 py-3 text-sm capitalize hover:bg-blue-500 hover:text-white ${category === item?.slug ? 'bg-blue-500 text-white' : ''}  rounded-md`}
                                            >
                                                {item?.name.length > 45 ? `${item?.name.slice(0, 45)}...` : item?.name}
                                            </button>
                                        </Menu.Item>
                                    ))
                                }
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
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
                                    {
                                        isFetching ?
                                            <Spinner />
                                            :
                                            <h1 className="text-xl font-bold text-gray-800 text-center">No Product Found.</h1>
                                    }
                                </div>
                            )
                            :
                            (
                                <>
                                    <div className="w-full h-full flex justify-center items-start mb-10 md:mb-0 md:w-1/2 md:h-1/2 lg:w-1/3 lg:h-1/3">
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
        </div>
    )
}

export default ProductsContainer