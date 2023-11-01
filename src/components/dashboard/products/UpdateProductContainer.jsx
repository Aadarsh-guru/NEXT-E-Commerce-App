'use client'
import React, { useEffect, useState } from 'react';
import SelectBox from './SelectBox';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import UpdateProductCarosal from './UpdateProductCarosal';
import uploadToS3 from '@/helpers/UploadToS3';

const UpdateProductContainer = ({ productId }) => {

    const router = useRouter();
    const [images, setImages] = useState([]);
    const [formData, setFormData] = useState({ title: '', subTitle: '', description: '', category: '', price: '', stock: '', images: [], discount: 0, });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const { data } = useQuery(['product', productId], async () => {
        const response = await axios.get(`/api/product/get/get-one/${productId}`)
        return response.data?.product;
    }, {
        staleTime: Infinity
    })

    useEffect(() => {
        if (data) {
            setFormData({
                title: data?.title,
                subTitle: data?.subTitle,
                description: data?.description,
                category: data?.category,
                price: data?.price,
                stock: data?.stock,
                discount: data?.discount
            })
            setImages(data?.images)
        }
    }, [data, productId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (images?.length === 0 && !formData.images[0]) {
                setLoading(false);
                toast.error('Please Select Images.');
                return;
            }
            if (!formData.title || !formData.subTitle || !formData.description || !formData.price || !formData.stock || !formData.category) {
                setLoading(false);
                toast.error('Please fill in all required fields.');
                return;
            }

            const imageKeys = [];
            for (const image of formData.images) {
                const uploadResult = await uploadToS3(image, 'product-images');
                if (uploadResult.success) {
                    imageKeys.push(uploadResult.key);
                } else {
                    console.error('Image upload failed:', uploadResult.message);
                    setLoading(false);
                    toast.error('Image upload failed.');
                    return;
                }
            }
            const response = await axios.post(`/api/product/update/${productId}`, { ...formData, images: imageKeys })
            if (response.data?.success) {
                toast.success(response.data?.message);
                setFormData({ title: '', subTitle: '', description: '', images: [], category: '', price: '', stock: '', discount: 0, })
                router.back();
            } else {
                toast.error(response.data?.message);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    const handleImagesChange = (e) => {
        const selectedImages = Array.from(e.target.files);
        if (selectedImages.length + images.length > 7) {
            e.target.value = null;
            toast.error("You can only select up to 7 images.");
        } else {
            setFormData({ ...formData, images: selectedImages });
        }
    };

    return (
        <div className="w-full min-h-[calc(100vh-60px)] flex flex-col justify-start items-center p-4 gap-4">
            <form className="w-full my-5 max-w-3xl" onSubmit={handleSubmit}>
                {/* Title */}
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        placeholder='Enter Product Title'
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Subtitle */}
                <div className="mb-4">
                    <label htmlFor="subTitle" className="block text-sm font-medium text-gray-700">
                        Subtitle
                    </label>
                    <input
                        type="text"
                        id="subTitle"
                        name="subTitle"
                        placeholder='Enter Product Sub title'
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        value={formData.subTitle}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder='Enter Product Description'
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        rows={5}
                    />
                </div>

                {/* Multiple Images */}
                <div className="mb-4">
                    <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                        Images (Select up to 7)
                    </label>
                    <input
                        type="file"
                        id="images"
                        name="images"
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        accept="image/*"  // Accept only image files
                        multiple  // Allow multiple file selection
                        onChange={handleImagesChange}
                    />
                </div>

                <div className="mb-4">
                    <UpdateProductCarosal slides={images} setImages={setImages} productId={productId} />
                </div>

                {/* Categories */}
                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Select Category
                    </label>
                    <SelectBox setFormData={setFormData} formData={formData} />
                </div>

                {/* Price */}
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder='Enter Product Price'
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Stock */}
                <div className="mb-4">
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                        Stock
                    </label>
                    <input
                        type="number"
                        id="stock"
                        name="stock"
                        placeholder='Enter Product stock quantity.'
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        value={formData.stock}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Discount */}
                <div className="mb-4">
                    <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
                        Discount {`(optinal)`}
                    </label>
                    <input
                        type="number"
                        id="discount"
                        name="discount"
                        placeholder='Enter Discount on this product'
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        value={formData.discount}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Submit Button */}
                <div className="mt-6 w-full">
                    <button
                        disabled={loading}
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 w-full active:scale-95 transition-transform"
                    >
                        {loading ? 'Updating Product..' : 'Update Product'}
                    </button>
                </div>

                {/* cancel changes button */}
                <div className="mt-6 w-full">
                    <div
                        onClick={() => !loading && router.back()}
                        className="w-full rounded-md border-2 px-3 py-2 text-gray-700 text-center transition-transform active:scale-[99%] cursor-pointer"
                    >
                        Cancel Changes
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateProductContainer