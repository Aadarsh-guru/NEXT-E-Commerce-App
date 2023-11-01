import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import toast from 'react-hot-toast'
import { MdDeleteOutline, MdOpenInNew } from 'react-icons/md'

const SlideCard = ({ slide }) => {

    const queryClient = useQueryClient();

    const handleDeleteSlide = async () => {
        try {
            const response = await axios.put(`/api/slide`, {
                image: slide?.image,
                id: slide?._id,
            })
            const { success, message } = response?.data;
            if (success) {
                toast.success(message);
                queryClient.invalidateQueries(['slides']);
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
            <img loading='lazy' className='w-full max-h-[300px] aspect-square' src={slide?.image} alt="Product Image" />
            <Link href={slide?.url} target='_blank' className="absolute top-2 right-2 p-1 transition-transform active:scale-95">
                <MdOpenInNew className='text-[28px] transition-transform  text-blue-600 hover:text-blue-400' />
            </Link>
            <button type="button" onClick={handleDeleteSlide} className="absolute top-2 left-2 p-1 transition-transform active:scale-95">
                <MdDeleteOutline className='text-[28px] transition-transform text-red-500 hover:text-red-700' />
            </button>
        </div>
    )
}

export default SlideCard