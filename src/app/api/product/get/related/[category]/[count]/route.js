import connect from '@/config/dbConfig'
import Product from '@/models/ProductModel';
import { NextResponse } from 'next/server'

export const GET = async (request, { params }) => {
    await connect();
    try {
        const products = await Product.find({ category: params?.category }).limit(params?.count).sort({ createdAt: 'descending' })
        return NextResponse.json({ message: 'related products fetched successfully.', success: true, products }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'error while fetching all the related products.', error, success: false }, { status: 500 })
    }
}