import Link from 'next/link';
import React, { useState } from 'react';
import { MdDeleteOutline, MdEmojiEvents, MdOutlineEmojiEvents, MdOutlineModeEditOutline, MdOutlineVisibility, MdStar, MdStarBorder } from 'react-icons/md'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';


const DashboardProductCard = ({ product, setProducts }) => {

    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);
    const [featured, setFeatured] = useState(product?.featured)
    const [bestseller, setBestseller] = useState(product?.bestseller);

    const deleteProduct = async () => {
        try {
            if (window.confirm('Are you sure you want to delete this product?')) {
                setLoading(true);
                const response = await axios.delete(`/api/product/delete/${product?._id}`);
                const { success, message } = response.data;
                if (success) {
                    toast.success(message);
                    setProducts(products => products.filter(p => p._id !== product._id));
                    setLoading(false);
                    queryClient.invalidateQueries(['bestseller', 'featured']);
                } else {
                    setLoading(false);
                    toast.error(message);
                }
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    }

    const toggleFeatured = async () => {
        try {
            setLoading(true);
            const response = await axios.put(`/api/product/toggle/${product?._id}`);
            const { success, message, updatedProduct } = response.data;
            if (success) {
                setFeatured(updatedProduct.featured);
                toast.success(message);
                setLoading(false);
                queryClient.invalidateQueries(['featured']);
            } else {
                setLoading(false);
                toast.error(message);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    }

    const toggleBestSeller = async () => {
        try {
            setLoading(true);
            const response = await axios.patch(`/api/product/toggle/${product?._id}`);
            const { success, message, updatedProduct } = response.data;
            if (success) {
                setBestseller(updatedProduct.bestseller);
                toast.success(message);
                setLoading(false);
                queryClient.invalidateQueries(['bestseller']);
            } else {
                setLoading(false);
                toast.error(message);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-4 mb-5">
            <div className="md:flex md:h-[300px]">
                <div className="md:w-1/2 h-full mb-4 md:mb-0">
                    <img
                        className="w-full h-full object-cover rounded-lg"
                        src={product?.images[0]}
                        alt="Product Image"
                        loading="lazy"
                    />
                </div>
                <div className="md:w-1/2 h-full flex flex-col justify-between md:pl-4">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-xl font-semibold text-gray-700 cursor-pointer">
                            {product?.title.length > 50 ? `${product?.title.slice(0, 50)}...` : product?.title}
                        </h2>
                        <p className="text-sm text-gray-600">
                            {new Date(product?.createdAt).toLocaleTimeString()} {new Date(product?.createdAt).toDateString()}
                        </p>
                        <h4 className="text-sm font-semibold mt-2">
                            Subtitle: {product?.subTitle.length > 50 ? `${product?.subTitle.slice(0, 50)}...` : product?.subTitle}
                        </h4>
                        <div className="mt-2">
                            <p className="text-sm">
                                Discount: <span className="text-green-600">{product?.discount}% OFF</span>
                            </p>
                            <p className="text-sm">
                                Price: <span className="text-blue-600">₹{product?.price}</span>
                            </p>
                        </div>
                        <p className="text-sm">
                            Stock: {product?.stock}
                        </p>
                        <p className="text-sm">
                            Category: {product?.category}
                        </p>
                        <p className="text-sm">
                            Images Count: {product?.images.length}
                        </p>
                    </div>
                    <div className="h-full w-full flex justify-evenly items-end">
                        <button onClick={toggleFeatured} disabled={loading} className='p-1 rounded-full hover:bg-gray-100 transition-transform active:scale-95' >
                            {
                                featured ?
                                    <MdStar className="text-yellow-500" fontSize={28} />
                                    :
                                    <MdStarBorder className='hover:text-yellow-500' fontSize={28} />
                            }
                        </button>
                        <button onClick={toggleBestSeller} disabled={loading} className='p-1 rounded-full hover:bg-gray-100 transition-transform active:scale-95' >
                            {
                                bestseller ?
                                    < MdEmojiEvents className='text-orange-300' fontSize={28} />
                                    :
                                    <MdOutlineEmojiEvents className='hover:text-orange-300' fontSize={28} />
                            }
                        </button>
                        <Link href={`/dashboard/update-product/${product?._id}`} className='p-1 rounded-full hover:bg-gray-100 transition-transform active:scale-95' >
                            <MdOutlineModeEditOutline className='hover:text-blue-500' fontSize={28} />
                        </Link>
                        <button onClick={deleteProduct} disabled={loading} className='p-1 rounded-full hover:bg-gray-100 transition-transform active:scale-95' >
                            <MdDeleteOutline className='hover:text-red-500' fontSize={28} />
                        </button>
                        <Link href={`/product/${product?._id}`} className='p-1 rounded-full hover:bg-gray-100 transition-transform active:scale-95' >
                            <MdOutlineVisibility className='hover:text-blue-400' fontSize={28} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardProductCard;
