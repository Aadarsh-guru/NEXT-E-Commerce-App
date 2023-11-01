import connect from "@/config/dbConfig";
import DeleteFromS3 from "@/helpers/DeleteFromS3";
import authOptions from "@/helpers/nextAuthOptions";
import Product from "@/models/ProductModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (request, { params }) => {
    await connect();
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: 'Unauthorized access', success: false }, { status: 401 })
        }
        const { title, subTitle, description, category, price, stock, discount, images } = await request.json();
        const product = await Product.findByIdAndUpdate(params.id, {
            title,
            subTitle,
            description,
            category,
            price,
            stock,
            discount,
            $push: { images: images }
        }, { new: true })
        return NextResponse.json({ message: 'Product updated successfully.', success: true, product }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error while updating the product.', error, success: false }, { status: 500 });
    }
};


export const PUT = async (request, { params }) => {
    await connect();
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: 'Unauthorized access', success: false }, { status: 401 })
        }
        const { image } = await request.json();
        await Product.findByIdAndUpdate(params.id, {
            $pull: { images: image }
        }, { new: true });
        await DeleteFromS3(image.toString())
        return NextResponse.json({ message: 'Image Deleted successfully.', success: true }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error while updating the product.', error, success: false }, { status: 500 });
    }
};