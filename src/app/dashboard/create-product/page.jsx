import CreateProductForm from '@/components/dashboard/products/CreateProductForm'
import React from 'react'

export const metadata = {
    title: 'Admin Dashboard - Create Product',
    description: 'this is the Admin Dashboard create product page',
}


const CreateProduct = () => {
    return (
        <div className="w-full h-full">
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 w-full py-4 flex items-center justify-center px-6 rounded-t-lg">
                <h4 className='text-2xl font-bold text-white'>Add new Product</h4>
            </div>
            <CreateProductForm />
        </div>
    )
}

export default CreateProduct