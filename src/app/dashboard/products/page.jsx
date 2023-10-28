import ProductsContainer from '@/components/dashboard/products/ProductsContainer'
import RefreshButton from '@/components/dashboard/users/RefreshButton'
import React from 'react'

export const metadata = {
    title: 'Admin Dashboard - Products',
    description: 'this is the Admin Dashboard products page',
}


const Products = () => {
    return (
        <div className="w-full h-full">
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 w-full py-4 flex items-center justify-between px-6 rounded-t-lg">
                <h4 className='text-2xl font-bold text-white'>All Products</h4>
                <div className="flex items-center">
                    <RefreshButton query='dashboard-products' />
                </div>
            </div>
            <ProductsContainer query='dashboard-products' />
        </div>
    )
}

export default Products