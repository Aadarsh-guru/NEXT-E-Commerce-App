import UpdateProductContainer from '@/components/dashboard/products/UpdateProductContainer';
import React from 'react'

export const metadata = {
    title: 'Admin Dashboard - Update Product',
    description: 'this is the Admin Dashboard page',
}


const UpdateProductPage = ({ params }) => {
    return (
        <div className="w-full h-full">
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 w-full py-4 flex items-center justify-center px-6 rounded-t-lg">
                <h4 className='text-2xl font-bold text-white'>Update Product</h4>
            </div>
            <UpdateProductContainer productId={params.id} />
        </div>
    )
}

export default UpdateProductPage;