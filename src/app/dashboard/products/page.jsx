import ProductsContainer from '@/components/dashboard/products/ProductsContainer'
import React from 'react'

export const metadata = {
    title: 'Admin Dashboard - Products',
    description: 'this is the Admin Dashboard products page',
}


const Products = () => {
    return (
        <ProductsContainer />
    )
}

export default Products