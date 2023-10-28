import ProductsContainer from '@/components/category-page/ProductsContainer';
import React from 'react'

export function generateMetadata({ params }) {
    return {
        title: `Category - ${params?.slug}`,
        description: 'This is category Page',
    };
}

const Category = ({ params }) => {
    return (
        <div className="w-full">
            <ProductsContainer category={params?.slug} />
        </div>
    )
}

export default Category