import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import { MdDeleteOutline } from 'react-icons/md'

const UpdateProductCarosalCard = ({ slide, productId }) => {

    const queryClient = useQueryClient();
    const handleDeleteSlide = async () => {
        try {
            const response = await axios.put(`/api/product/update/${productId}`, {
                image: slide,
            })
            const { success, message } = response?.data;
            if (success) {
                toast.success(message);
                queryClient.invalidateQueries(['product', productId]);
            } else {
                toast.error(message);
            }
        } catch (error) {
            toast.error('something went wrong.')
            console.log(error);
        }
    }

    return (
        <div className='transform overflow-hidden bg-white duration-200 relative'>
            <img loading='lazy' className='w-full max-h-[300px] aspect-square' src={slide} alt="Product Image" />
            <button type="button" onClick={handleDeleteSlide} className="absolute top-2 left-2 p-1 transition-transform active:scale-95">
                <MdDeleteOutline className='text-[28px] transition-transform text-red-500 hover:text-red-700' />
            </button>
        </div>
    )
}

export default UpdateProductCarosalCard