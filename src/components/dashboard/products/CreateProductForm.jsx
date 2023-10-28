'use client'
import React, { useState } from 'react';
import SelectBox from './SelectBox';
import toast from 'react-hot-toast';
import uploadToS3 from '@/helpers/UploadToS3';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const CreateProductForm = () => {

    const session = useSession();
    const [formData, setFormData] = useState({ title: '', subTitle: '', description: '', images: [], category: '', price: '', stock: '', discount: 0, });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImagesChange = (e) => {
        const selectedImages = Array.from(e.target.files);
        if (selectedImages.length > 7) {
            e.target.value = null;
            toast.error("You can only select up to 5 images.");
        } else {
            setFormData({ ...formData, images: selectedImages });
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (!formData.title || !formData.subTitle || !formData.description || !formData.price || !formData.stock || !formData.images[0] || !formData.category) {
                setLoading(false);
                toast.error('Please fill in all required fields.');
                return;
            }

            // Upload multiple images and collect their keys
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

            // Send a POST request to your server with image keys and other form data

            const response = await axios.post(`/api/product/create`, {
                ...formData,
                images: imageKeys,
                seller: session.data?.user?.id
            })

            if (response.data?.success) {
                toast.success(response.data?.message);
                setFormData({ title: '', subTitle: '', description: '', images: [], category: '', price: '', stock: '', discount: 0, })
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

    return (
        <div className="w-full h-screen flex flex-col justify-start items-center p-4 gap-4 overflow-y-auto">
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
                        {loading ? 'Processing..' : 'Create Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateProductForm;