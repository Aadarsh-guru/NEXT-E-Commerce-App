import connect from "@/config/dbConfig"
import Product from "@/models/ProductModel";
import { NextResponse } from "next/server";


export const GET = async (request, { params }) => {
    await connect();
    try {
        const product = await Product.findById(params.id);
        if (!product) {
            return NextResponse.json({ message: 'product not found.', success: false }, { status: 404 })
        }
        return NextResponse.json({ message: 'successfully fetched single product.', product, success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'error while fetching single product.', error, success: false }, { status: 500 })
    }
}