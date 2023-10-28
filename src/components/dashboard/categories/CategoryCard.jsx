import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { MdEdit, MdDelete, MdCancel, MdSave } from 'react-icons/md';
import slugify from 'slugify';

const CategoryCard = ({ category, index, queryClient, query }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(category?.name);
    const [loading, seLoading] = useState(false);

    const handleSaveClick = async () => {
        try {
            if (!editedName) {
                return toast.error('Please enter new category name.')
            }
            seLoading(true)
            const categorySlug = slugify(editedName, {
                lower: true,
                remove: /[*+~.()'"!:@,]/g,
            });
            const response = await axios.put(`/api/category/${category?.slug}`, { name: editedName, slug: categorySlug });
            response && seLoading(false)
            if (response.data.success) {
                setEditedName('');
                toast.success(response.data.message)
                queryClient.invalidateQueries([query])
                setIsEditing(false)
            } else {
                setIsEditing(false)
                toast.error(response.data.message)
            }
        } catch (error) {
            seLoading(false)
            toast.error('something went wrong.')
            console.error('Error editing category:', error);
        }
    };

    const handleDeleteClick = async () => {
        try {
            if (window.confirm('Are you sure you want to delete this category?')) {
                seLoading(true)
                const response = await axios.delete(`/api/category/${category?.slug}`);
                response && seLoading(false)
                if (response.data.success) {
                    toast.success(response.data.message)
                    queryClient.invalidateQueries([query])
                } else {
                    toast.error(response.data.message)
                }
            }
        } catch (error) {
            seLoading(false);
            toast.error('something went wrong.')
            console.error('Error adding category:', error);
        }
    }

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedName(category?.name);
    };

    return (
        <div className="w-full p-4 rounded-md shadow-md flex justify-between items-center mb-4" style={{ background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)' }}>
            <div className='flex gap-4 w-[60%] lg:w-[80%]'>
                <div className="text-gray-600">{index + 1}</div>
                {isEditing ? (
                    <input
                        type="text"
                        className="text-xl font-bold text-gray-800 bg-transparent border-b border-gray-800 focus:outline-none w-full"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                    />
                ) : (
                    <div className="text-xl font-bold text-gray-800">{category?.name.length > 45 ? `${category?.name.slice(0, 45)}...` : category?.name} </div>
                )}
            </div>
            <div className="space-x-2">
                {isEditing ? (
                    <>
                        <button className="bg-red-500 hover:bg-red-600 text-white rounded-full active:scale-95 p-2" disabled={loading} onClick={handleCancelClick}>
                            <MdCancel size={20} />
                        </button>
                        <button className="bg-green-500 hover:bg-green-600 text-white rounded-full active:scale-95 p-2" disabled={loading} onClick={handleSaveClick}>
                            <MdSave size={20} />
                        </button>
                    </>
                ) : (
                    <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full active:scale-95 p-2" disabled={loading} onClick={handleEditClick}>
                        <MdEdit size={20} />
                    </button>
                )}
                <button className="bg-red-500 hover:bg-red-600 text-white rounded-full active:scale-95 p-2" disabled={loading} onClick={handleDeleteClick}>
                    <MdDelete size={20} />
                </button>
            </div>
        </div>
    );
}

export default CategoryCard;
