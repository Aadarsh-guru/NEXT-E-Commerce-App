import connect from "@/config/dbConfig";
import authOptions from "@/helpers/nextAuthOptions";
import Category from "@/models/CategoryModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
    await connect();
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: 'Unauthorized access', success: false }, { status: 401 })
        }
        const category = await Category.findOneAndDelete({ slug: params?.slug })
        return NextResponse.json({ message: 'Category deleted successfully', success: true, category }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'Error while deleting category', error, success: false }, { status: 500 })

    }
}

export const PUT = async (request, { params }) => {
    await connect();
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: 'Unauthorized access', success: false }, { status: 401 })
        }
        const { name, slug } = await request.json();
        const category = await Category.findOneAndUpdate({ slug: params?.slug }, { name, slug }, { new: true })
        return NextResponse.json({ message: 'Category updated successfully', success: true, category }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'Error while updating category', error, success: false }, { status: 500 })

    }
}