import connect from '@/config/dbConfig'
import Product from '@/models/ProductModel';
import { NextResponse } from 'next/server'


export const GET = async (request, { params }) => {
    await connect();
    try {
        const perPage = params.count;
        const page = params.page ? params.page : 1;
        const products = await Product.find({ category: params?.category }).skip((page - 1) * perPage).limit(perPage).sort({ createdAt: 'descending' })
        return NextResponse.json({ message: 'products fetched successfully.', success: true, products }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'error while fetching all the products.', error, success: false }, { status: 500 })
    }
}