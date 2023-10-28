'use client'
import React, { useState } from 'react';
import slugify from 'slugify';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Spinner from '@/components/loaders/Spinner';
import CategoryCard from './CategoryCard';
import toast from 'react-hot-toast';

const CategoriesContainer = ({ query }) => {

    const [newCategory, setNewCategory] = useState('');
    const [loading, seLoading] = useState(false);
    const queryClient = useQueryClient();

    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            if (!newCategory) {
                return toast.error('Please enter a category name.')
            }
            seLoading(true)
            const categorySlug = slugify(newCategory, {
                lower: true,
                remove: /[*+~.()'"!:@,]/g,
            });
            const response = await axios.post(`/api/category`, { name: newCategory, slug: categorySlug, });
            response && seLoading(false)
            if (response.data.success) {
                setNewCategory('');
                toast.success(response.data.message)
                queryClient.invalidateQueries([query])
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            seLoading(false)
            toast.error('something went wrong.')
            console.error('Error adding category:', error);
        }
    };


    const fetchCategories = async () => {
        const response = await axios.get(`/api/category`);
        return response.data;
    };

    const { data, isFetching } = useQuery([query], fetchCategories, {
        staleTime: Infinity,
    });

    return (
        <div className="w-full h-[calc(100vh-60px)] flex flex-col justify-start items-center p-4 gap-4 overflow-y-auto">
            {/* Inline Form for Adding a Category */}
            <form onSubmit={handleAddCategory} className="mb-4 flex items-center">
                <input
                    type="text"
                    placeholder="Add a new category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="border rounded-md p-2 mr-2"
                />
                <button
                    disabled={loading}
                    type='submit'
                    className="bg-blue-500 text-white px-4 py-2 rounded-md transition-transform active:scale-95 hover:bg-blue-600"
                >
                    {loading ? 'Adding..' : 'Add Category'}
                </button>
            </form>
            {/* Display Existing Categories */}
            <div className="h-full w-full p-8 overflow-y-auto">
                {isFetching ? (
                    <div className="w-full h-full flex justify-center items-center">
                        <Spinner />
                    </div>
                ) : (
                    data?.categories?.length === 0 ?
                        <div className="w-full h-full flex justify-center items-center">
                            <h1 className="text-2xl font-bold text-gray-800">No Categories Found.</h1>
                        </div>
                        :
                        data?.categories.map((category, index) => (
                            <CategoryCard queryClient={queryClient} index={index} category={category} key={index} query={query} />
                        ))
                )}
            </div>
        </div>
    );
};

export default CategoriesContainer;
