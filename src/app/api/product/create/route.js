import connect from "@/config/dbConfig";
import authOptions from "@/helpers/nextAuthOptions";
import Category from "@/models/CategoryModel";
import Product from "@/models/ProductModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    await connect();
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: 'Unauthorized access', success: false }, { status: 401 })
        }
        const reqBody = await request.json();
        if (
            !reqBody.title ||
            !reqBody.subTitle ||
            !reqBody.description ||
            !reqBody.images ||
            !reqBody.category ||
            !reqBody.price ||
            !reqBody.stock ||
            !reqBody.seller
        ) {
            return NextResponse.json({ message: 'Please provide all required fields.', success: false }, { status: 400 });
        }
        // Create a new Product instance
        const newProduct = new Product({
            title: reqBody.title,
            subTitle: reqBody.subTitle,
            description: reqBody.description,
            images: reqBody.images,
            category: reqBody.category,
            price: reqBody.price,
            stock: reqBody.stock,
            seller: reqBody.seller,
            discount: reqBody.discount || 0,
        });

        // Save the product to the database
        await newProduct.save();
        // Add the product to the category
        await Category.findOneAndUpdate({ slug: reqBody.category }, { $push: { products: newProduct._id } }, { new: true });
        return NextResponse.json({ message: 'Product created successfully.', success: true, product: newProduct }, { status: 201 });
    } catch (error) {
        console.error('Error while creating product:', error);
        return NextResponse.json({ message: 'Error while creating product.', error, success: false }, { status: 500 });
    }
};
