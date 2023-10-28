import connect from '@/config/dbConfig'
import Product from '@/models/ProductModel';
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export const GET = async () => {
    await connect();
    try {
        const products = await Product.find({ bestseller: true }).sort({ createdAt: 'descending' })
        return NextResponse.json({ message: 'bestseller products fetched successfully.', success: true, products }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'error while fetching all the bestseller products.', error, success: false }, { status: 500 })
    }
}