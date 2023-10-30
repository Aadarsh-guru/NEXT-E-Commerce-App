import connect from '@/config/dbConfig'
import DeleteFromS3 from '@/helpers/DeleteFromS3'
import authOptions from '@/helpers/nextAuthOptions'
import Category from '@/models/CategoryModel'
import Product from '@/models/ProductModel'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export const DELETE = async (request, { params }) => {
    await connect()
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: 'Unauthorized access', success: false }, { status: 401 })
        }
        const product = await Product.findByIdAndDelete(params.id)
        if (!product) {
            return NextResponse.json({ message: 'Product not found.', success: false }, { status: 404 });
        }
        for (const imageUrl of product.images) {
            await DeleteFromS3(imageUrl);
        }
        await Category.findOneAndUpdate({ slug: product.category }, { $pull: { products: params.id } }, { new: true })
        return NextResponse.json({ message: 'product deleted successfully.', success: true, product }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'error while deleting the product', error, success: false }, { status: 500 })
    }
}