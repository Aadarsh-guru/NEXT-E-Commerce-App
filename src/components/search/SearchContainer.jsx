'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../loaders/Spinner";
import ProductCard from "../product/ProductCard";
import { useQuery } from "@tanstack/react-query";
import FilterModel from "./FilterModel";
import toast from "react-hot-toast";

const SearchCotainer = ({ searchValue }) => {

    const [page, setPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sort, setSort] = useState('');
    const [products, setProducts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [filter, setFilter] = useState({
        minPrice: 0,
        maxPrice: 0
    })

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`/api/search?page=${page}&quantity=${12}&query=${searchQuery}${sort ? `&sort=${sort}` : ''}${filter.minPrice > 0 || filter.maxPrice > 0 ? `&minPrice=${filter.minPrice}&maxPrice=${filter.maxPrice}` : ''}`)
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

    useEffect(() => {
        setPage(1);
        setProducts([]);
        setHasMore(true);
        setSearchQuery(searchValue);
    }, [searchValue])

    const { data, isLoading, isFetching } = useQuery(['search-products', searchQuery, page, sort, filter.minPrice, filter.maxPrice], fetchProducts, {
        keepPreviousData: true,
        staleTime: Infinity
    })

    useEffect(() => {
        if (data) {
            setProducts([...products, ...data])
        }
    }, [data])

    const handleSort = (value) => {
        setPage(1);
        setProducts([]);
        setHasMore(true);
        setSearchQuery(searchValue);
        setSort(value);
        return;
    }

    const handleFilter = (value) => {
        setPage(1);
        setProducts([]);
        setHasMore(true);
        setSearchQuery(searchValue);
        setFilter({ maxPrice: value.maxValue, minPrice: value.minValue });
        return;
    }

    const clearFilters = () => {
        setPage(1);
        setProducts([]);
        setHasMore(true);
        setSearchQuery(searchValue);
        setSort('');
        setFilter({ maxPrice: 0, minPrice: 0 });
        return;
    }

    return (
        <div className="w-full min-h-[100vh]">
            <div className="w-full min-h-10 flex justify-end items-center px-4">
                <svg onClick={() => setIsOpen(!isOpen)} className="cursor-pointer text-black/50 hover:text-black transition-transform active:scale-95" width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 7H6" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M3 17H9" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M18 17L21 17" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M15 7L21 7" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M6 7C6 6.06812 6 5.60218 6.15224 5.23463C6.35523 4.74458 6.74458 4.35523 7.23463 4.15224C7.60218 4 8.06812 4 9 4C9.93188 4 10.3978 4 10.7654 4.15224C11.2554 4.35523 11.6448 4.74458 11.8478 5.23463C12 5.60218 12 6.06812 12 7C12 7.93188 12 8.39782 11.8478 8.76537C11.6448 9.25542 11.2554 9.64477 10.7654 9.84776C10.3978 10 9.93188 10 9 10C8.06812 10 7.60218 10 7.23463 9.84776C6.74458 9.64477 6.35523 9.25542 6.15224 8.76537C6 8.39782 6 7.93188 6 7Z" stroke="#141B34" stroke-width="1.5" />
                    <path d="M12 17C12 16.0681 12 15.6022 12.1522 15.2346C12.3552 14.7446 12.7446 14.3552 13.2346 14.1522C13.6022 14 14.0681 14 15 14C15.9319 14 16.3978 14 16.7654 14.1522C17.2554 14.3552 17.6448 14.7446 17.8478 15.2346C18 15.6022 18 16.0681 18 17C18 17.9319 18 18.3978 17.8478 18.7654C17.6448 19.2554 17.2554 19.6448 16.7654 19.8478C16.3978 20 15.9319 20 15 20C14.0681 20 13.6022 20 13.2346 19.8478C12.7446 19.6448 12.3552 19.2554 12.1522 18.7654C12 18.3978 12 17.9319 12 17Z" stroke="#141B34" stroke-width="1.5" />
                </svg>
            </div>
            <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center overflow-y-auto">
                {
                    isLoading ?
                        (
                            <div className="w-full min-h-[calc(100vh-40px)] flex justify-center items-center">
                                <Spinner />
                            </div>
                        )
                        :
                        products?.length === 0 ?
                            (
                                <div className="w-full min-h-[calc(100vh-40px)] flex justify-center items-center">
                                    {isFetching ?
                                        <Spinner />
                                        :
                                        <h1 className="text-xl font-bold text-gray-800 text-center">No Product Found. for - "{searchQuery}"</h1>

                                    }
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
                        <div className="w-full  h-[100px]  flex justify-center items-center">
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
            <FilterModel
                sort={sort} handleSort={handleSort}
                isOpen={isOpen} setIsOpen={setIsOpen}
                filter={filter} setFilter={setFilter}
                handleFilter={handleFilter} clearFilters={clearFilters}
            />
        </div>
    )
}

export default SearchCotainer