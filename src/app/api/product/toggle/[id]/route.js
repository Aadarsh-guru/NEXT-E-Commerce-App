import connect from '@/config/dbConfig'
import authOptions from '@/helpers/nextAuthOptions'
import Product from '@/models/ProductModel'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export const PUT = async (request, { params }) => {
    await connect()
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: 'Unauthorized access', success: false }, { status: 401 })
        }
        const product = await Product.findById(params.id);
        if (!product) {
            return NextResponse.json({ message: 'product not found', success: false }, { status: 404 })
        }
        const updatedProduct = await Product.findByIdAndUpdate(params.id, { featured: !product?.featured }, { new: true })
        return NextResponse.json({ message: 'product featured successfully.', success: true, updatedProduct }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'error while toggle featured product', error, success: false }, { status: 500 })
    }
}

export const PATCH = async (request, { params }) => {
    await connect()
    try {
        const product = await Product.findById(params.id);
        if (!product) {
            return NextResponse.json({ message: 'product not found', success: false }, { status: 404 })
        }
        const updatedProduct = await Product.findByIdAndUpdate(params.id, { bestseller: !product?.bestseller }, { new: true })
        return NextResponse.json({ message: 'product marked as bestseller.', success: true, updatedProduct }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'error while toggle featured product', error, success: false }, { status: 500 })
    }
}